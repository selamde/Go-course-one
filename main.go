package main

import (
	"fmt"
	"log"
	"os"

	"github.com/gofiber/fiber/v2"
	"github.com/joho/godotenv"
)

type Todo struct {
	ID        int    `json:"id"`
	Completed bool   `json:"completed"`
	Body      string `json:"body" `
}

func main() {
	fmt.Println("Hello world")
	// var name string = "selam"
	// const secondName = "Abebe"

	// thirdName := "jhon"
	// fmt.Println(name)
	// fmt.Println(secondName)
	// fmt.Println(thirdName)

	//create a new application
	app := fiber.New()

	err := godotenv.Load(".env")
	if err != nil {
		log.Fatal("Error loading the env file")
	}
	PORT := os.Getenv("PORT")
	todos := []Todo{}

	//get todos
	app.Get("/api/todos", func(c *fiber.Ctx) error {
		// return c.Status(200).JSON(fiber.Map{"msg": "hello world"})
		return c.Status(200).JSON(todos)
	})

	//create a todo
	app.Post("/api/todos", func(c *fiber.Ctx) error {
		todo := &Todo{}
		if err := c.BodyParser(todo); err != nil {
			return err
		}

		if todo.Body == "" {
			return c.Status(400).JSON(fiber.Map{"error": "Todo body requierd"})
		}
		todo.ID = len(todos) + 1
		todos = append(todos, *todo)

		//pointer
		// var x int = 5   // 0x7ffe445d8b14
		// var p *int = &x //0x7ffe445d8b14
		// fmt.Println(p)  // 0x7ffe445d8b14
		// fmt.Println(*p) // 5

		return c.Status(201).JSON(todo)
	})

	//updating todos

	app.Patch("/api/todos/:id", func(c *fiber.Ctx) error {
		id := c.Params("id")

		for i, todo := range todos {
			if fmt.Sprint(todo.ID) == id {
				todos[i].Completed = true
				return c.Status(200).JSON(todos[i])
			}
		}

		return c.Status(404).JSON(fiber.Map{"error": "Todo not found"})
	})

	app.Delete("/api/todos/:id", func(c *fiber.Ctx) error {
		id := c.Params("id")

		for i, todo := range todos {
			if fmt.Sprint(todo.ID) == id {
				todos = append(todos[:i], todos[i+1:]...)
				return c.Status(200).JSON(fiber.Map{"msg": "Todo deleted sucessfully"})
			}
		}

		return c.Status(404).JSON(fiber.Map{"error": "Todo not found!"})

	})

	log.Fatal(app.Listen(PORT))
}
