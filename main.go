package main

import (
	"context"
	"fmt"
	"log"
	"os"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/joho/godotenv"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type Todo struct {
	ID        primitive.ObjectID `json:"id,omitempty" bson:"_id,omitempty"`
	Completed bool               `json:"completed"`
	Body      string             `json:"body" `
}

var collection *mongo.Collection

func main() {
	//load the .env file
	err := godotenv.Load(".env")
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	MONGODB_URI := os.Getenv("MONGODB_URI")
	PORT := os.Getenv("PORT")

	//connect to the database
	clientoptions := options.Client().ApplyURI(MONGODB_URI)

	client, err := mongo.Connect(context.Background(), clientoptions)
	if err != nil {
		log.Fatal("Error: ", err)
	}

	defer client.Disconnect(context.Background())

	//ping the database
	err = client.Ping(context.Background(), nil)
	if err != nil {
		log.Fatal("Error: ", err)
	}

	fmt.Println("Connected to the database")

	collection = client.Database("golang_db").Collection("todos")

	app := fiber.New()
	app.Use(cors.New(cors.Config{
		AllowOrigins: "http://localhost:5173",
		AllowHeaders: "origins, Content-Type, Accept",
	}))

	app.Get("/api/todos", getTodos)
	app.Get("/api/todos/:id", getSignleTodo)
	app.Post("/api/todos", createTodo)
	app.Patch("/api/todos/:id", updateTodo)
	app.Delete("/api/todos/:id", deleteTodo)

	log.Fatal(app.Listen(":" + PORT))

}

//create handler functions

func getTodos(c *fiber.Ctx) error {
	//array | slice
	var todos []Todo
	//no filter
	cursor, err := collection.Find(context.Background(), bson.M{})
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"Error": "Error geting the todos"})
	}
	//close the cursor after the function returns
	defer cursor.Close(context.Background())
	//map through it
	for cursor.Next(context.Background()) {
		var todo Todo
		if err := cursor.Decode(&todo); err != nil {
			return err
		}
		todos = append(todos, todo)
	}

	return c.JSON(fiber.Map{
		"message": "data fetched successfully",
		"data":    todos,
	})
}

func getSignleTodo(c *fiber.Ctx) error {
	var todo Todo
	id := c.Params("id")
	objectId, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return c.Status(404).JSON(fiber.Map{"Error": "Invalid Id"})
	}
	err = collection.FindOne(context.Background(), bson.M{"_id": objectId}).Decode(&todo)

	if err != nil {
		return c.Status(400).JSON(fiber.Map{"Error": "Todo not found"})
	}
	return c.Status(200).JSON(todo)
}

func createTodo(c *fiber.Ctx) error {
	// pointer
	todo := new(Todo)

	if err := c.BodyParser(todo); err != nil {
		return err
	}

	if todo.Body == "" {
		return c.Status(400).JSON(fiber.Map{"Msg": "Todo body can not be empty"})
	}
	insertResult, err := collection.InsertOne(context.Background(), todo)

	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"Error": "Error creaing a todo"})
	}
	todo.ID = insertResult.InsertedID.(primitive.ObjectID)
	return c.Status(201).JSON(todo)
}

func updateTodo(c *fiber.Ctx) error {
	id := c.Params("id")
	objectId, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return c.Status(404).JSON(fiber.Map{"Msg": "Invalid Id"})
	}

	filter := bson.M{"_id": objectId}
	update := bson.M{"$set": bson.M{"completed": true}}
	//_ -I don't care about this value.
	_, err = collection.UpdateOne(context.Background(), filter, update)
	if err != nil {
		return err
	}
	return c.Status(200).JSON(fiber.Map{
		"message": "todo updated successfully",
	})
}

func deleteTodo(c *fiber.Ctx) error {
	id := c.Params("id")
	objectId, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return c.Status(404).JSON(fiber.Map{"Error": "Invalid id"})
	}

	filter := bson.M{"_id": objectId}

	_, err = collection.DeleteOne(context.Background(), filter)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"Error": "Something went wrong"})
	}

	return c.Status(200).JSON(fiber.Map{"Msg": "todo deleted successfully!"})
}
