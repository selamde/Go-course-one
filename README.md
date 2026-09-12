# Go & Fiber Todo API

A lightweight, high-performance RESTful API for managing tasks and todos, built with [Go (Golang)](https://golang.org/) and the [Fiber](https://gofiber.io/) web framework.

---

## 🚀 Features

- **Fast & Minimalist**: Powered by [Fiber v2](https://github.com/gofiber/fiber), inspired by Express.js.
- **CRUD Operations**: Endpoints to create, read, complete, and delete todos.
- **Environment Configuration**: Seamless `.env` variable loading with [`godotenv`](https://github.com/joho/godotenv).
- **Live Reloading**: Configured with [`Air`](https://github.com/air-verse/air) for instant live reloading during development.
- **Structured JSON Responses**: Strict data modeling and validation using Go structs and JSON tags.

---

## 🛠️ Tech Stack

- **Language:** [Go](https://go.dev/) (1.22+)
- **Web Framework:** [Fiber v2](https://github.com/gofiber/fiber/v2)
- **Environment Management:** [godotenv](https://github.com/joho/godotenv)
- **Hot Reloading:** [Air](https://github.com/air-verse/air)

---

## 📁 Project Structure

```text
go-fullstack/
├── .env                # Environment variables (PORT, configs)
├── .gitignore          # Git ignore rules
├── air.toml            # Air configuration for live reloading
├── go.mod              # Go module definition & dependencies
├── go.sum              # Checksums for module dependencies
├── main.go             # Application entry point, models & API routes
└── README.md           # Project documentation
```

---

## ⚙️ Getting Started

### Prerequisites

- [Go](https://go.dev/dl/) (version 1.22 or higher installed)
- [Air](https://github.com/air-verse/air) *(optional, for live reload)*:
  ```bash
  go install github.com/air-verse/air@latest
  ```

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/selamde/Go-course-one.git
   cd Go-course-one
   ```

2. **Install Go dependencies:**
   ```bash
   go mod download
   ```

3. **Configure environment variables:**
   Create a `.env` file in the root directory:
   ```env
   PORT=:5000
   ```
   *(Note: Fiber supports formats like `:5000` or `5000` depending on your listener setup)*

---

## 🏃 Running the Application

### Development (with Hot Reloading)
Run using `air` to automatically recompile when changes are saved:
```bash
air
```

### Production / Standard Run
Run directly with the Go toolchain:
```bash
go run main.go
```

The server will start listening on the port configured in your `.env` file (e.g., `http://localhost:5000`).

---

## 📡 API Endpoints

| Method   | Endpoint          | Description                         |
|----------|-------------------|-------------------------------------|
| `GET`    | `/api/todos`      | Get all todos                       |
| `POST`   | `/api/todos`      | Create a new todo                   |
| `PATCH`  | `/api/todos/:id`  | Mark a todo as completed            |
| `DELETE` | `/api/todos/:id`  | Delete a todo by ID                 |

---

### Request & Response Examples

#### 1. Get All Todos
- **Request:**
  ```http
  GET /api/todos
  ```
- **Response (`200 OK`):**
  ```json
  [
    {
      "id": 1,
      "completed": false,
      "body": "Learn Go & Fiber"
    }
  ]
  ```

#### 2. Create a Todo
- **Request:**
  ```http
  POST /api/todos
  Content-Type: application/json

  {
    "body": "Build a fullstack React + Go application"
  }
  ```
- **Response (`201 Created`):**
  ```json
  {
    "id": 2,
    "completed": false,
    "body": "Build a fullstack React + Go application"
  }
  ```

#### 3. Complete a Todo
- **Request:**
  ```http
  PATCH /api/todos/1
  ```
- **Response (`200 OK`):**
  ```json
  {
    "id": 1,
    "completed": true,
    "body": "Learn Go & Fiber"
  }
  ```

#### 4. Delete a Todo
- **Request:**
  ```http
  DELETE /api/todos/1
  ```
- **Response (`200 OK`):**
  ```json
  {
    "msg": "Todo deleted sucessfully"
  }
  ```

---

## 📝 Todo Data Model

```go
type Todo struct {
    ID        int    `json:"id"`
    Completed bool   `json:"completed"`
    Body      string `json:"body"`
}
```

---

## 🔮 Future Enhancements

- [ ] Connect with a persistent database (PostgreSQL / MongoDB).
- [ ] Connect with a frontend client (React + Vite / TailwindCSS).
- [ ] Implement user authentication and JWT authorization.
