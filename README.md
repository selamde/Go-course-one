# Fullstack Go & React Todo Application

A modern, high-performance, full-stack Todo application built with a **Go (Fiber)** backend, **MongoDB** database, and a **React (TypeScript + Vite)** frontend styled with **Chakra UI** and **Tailwind CSS**, powered by **TanStack React Query** for server state management.

---

## 🚀 Features

### 🖥️ Frontend (Client)
- **Modern UI / UX**: Clean, responsive interface built with Chakra UI v3 and Tailwind CSS v4.
- **Server State Management**: Fast and reactive data fetching, caching, and cache invalidation powered by TanStack Query v5.
- **Task Management**: Create tasks, toggle completion status with visual indicators, and delete tasks.
- **Vite & React 19**: Lightning-fast Hot Module Replacement (HMR) and optimized builds with TypeScript support.

### ⚙️ Backend (API)
- **Fast & Lightweight**: Built with [Fiber v2](https://gofiber.io/), an Express-inspired web framework for Go.
- **Persistent Storage**: Connected to [MongoDB](https://www.mongodb.com/) using the official Go Mongo Driver.
- **CORS Configured**: Pre-configured cross-origin resource sharing for frontend development.
- **Static Asset Serving**: Supports serving the compiled frontend bundle (`client/dist`) directly from the Go server in production.
- **Live Reloading**: Configured with [`Air`](https://github.com/air-verse/air) for instant recompilation during development.

---

## 🛠️ Tech Stack

### Backend
| Technology | Description |
|---|---|
| [Go (Golang)](https://go.dev/) | Core programming language (1.22+) |
| [Fiber v2](https://github.com/gofiber/fiber) | High-performance HTTP web framework |
| [MongoDB Go Driver](https://go.mongodb.org/mongo-driver) | Official database driver for MongoDB |
| [godotenv](https://github.com/joho/godotenv) | Loads environment variables from `.env` |
| [Air](https://github.com/air-verse/air) | Live reload utility for Go applications |

### Frontend
| Technology | Description |
|---|---|
| [React 19](https://react.dev/) | Frontend UI library |
| [TypeScript](https://www.typescriptlang.org/) | Type-safe JavaScript |
| [Vite](https://vite.dev/) | Next-generation frontend build tool |
| [TanStack Query v5](https://tanstack.com/query) | Asynchronous state and cache management |
| [Chakra UI v3](https://chakra-ui.com/) | Accessible component library |
| [Tailwind CSS v4](https://tailwindcss.com/) | Utility-first CSS framework |
| [React Icons](https://react-icons.github.io/react-icons/) | Icon collection |

---

## 📁 Project Structure

```text
go-fullstack/
├── .env                    # Backend environment variables (PORT, MONGODB_URI, ENV)
├── .gitignore              # Git ignore configuration
├── air.toml                # Air live reload configuration for Go
├── go.mod                  # Go module definition and dependencies
├── go.sum                  # Checksums for Go dependencies
├── main.go                 # Go/Fiber backend entry point, database connection & API routes
│
├── client/                 # React frontend application
│   ├── .env                # Frontend environment variables (VITE_API_URL)
│   ├── .env.example        # Example frontend environment configuration
│   ├── index.html          # HTML entry file
│   ├── package.json        # Frontend dependencies and npm scripts
│   ├── tsconfig.json       # TypeScript compiler settings
│   ├── vite.config.ts      # Vite configuration
│   └── src/
│       ├── App.tsx         # Main application layout & API configuration
│       ├── main.tsx        # React entry point, Chakra & QueryClient providers
│       ├── index.css       # Global styles & Tailwind imports
│       └── components/     # Reusable React components
│           ├── Navbar.tsx      # Navigation header
│           ├── TodoForm.tsx    # Form to create new todos
│           ├── TodoList .tsx   # List view with TanStack Query fetching
│           ├── Todoitem.tsx    # Individual todo item with complete/delete mutations
│           └── ui/             # Chakra UI provider helpers
└── README.md               # Project documentation
```

---

## ⚙️ Getting Started

### Prerequisites

Ensure you have the following installed on your machine:
- [Go](https://go.dev/dl/) (version 1.22 or higher)
- [Node.js](https://nodejs.org/) (version 18 or higher) and `npm`
- [MongoDB](https://www.mongodb.com/) (local instance or a free [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) cluster)
- [Air](https://github.com/air-verse/air) *(optional, for backend live-reloading)*:
  ```bash
  go install github.com/air-verse/air@latest
  ```

---

### Installation & Configuration

1. **Clone the repository:**
   ```bash
   git clone https://github.com/selamde/Go-course-one.git
   cd Go-course-one
   ```

2. **Configure Backend Environment:**
   Create a `.env` file in the root directory:
   ```env
   PORT=5000
   ENV=development
   MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/?retryWrites=true&w=majority
   ```

3. **Install Backend Dependencies:**
   ```bash
   go mod download
   ```

4. **Configure Frontend Environment:**
   Create a `.env` file inside the `client` directory:
   ```bash
   cd client
   cp .env.example .env
   ```
   Ensure `client/.env` points to your backend API:
   ```env
   VITE_API_URL="http://localhost:5000/api/todos"
   ```

5. **Install Frontend Dependencies:**
   ```bash
   npm install
   cd ..
   ```

---

## 🏃 Running the Application

### 1. Development Mode (Separate Frontend & Backend)

Run the backend and frontend in separate terminal windows:

- **Terminal 1: Start Backend (with live reload):**
  ```bash
  # Using Air (recommended)
  air

  # Or using standard Go runner
  go run main.go
  ```
  The API will start on `http://localhost:5000`.

- **Terminal 2: Start Frontend:**
  ```bash
  cd client
  npm run dev
  ```
  The frontend will start on `http://localhost:5173`. Open this URL in your browser.

---

### 2. Production Mode (Single-Server Deployment)

In production, the Go Fiber server serves both the API endpoints and the compiled React static files:

1. **Build the frontend bundle:**
   ```bash
   cd client
   npm run build
   cd ..
   ```

2. **Set the environment to production:**
   In your root `.env` file:
   ```env
   ENV=production
   PORT=5000
   MONGODB_URI=your_production_mongodb_uri
   ```

3. **Start the Go server:**
   ```bash
   go run main.go
   ```
   Visit `http://localhost:5000` to see the fullstack application running on a single port.

---

## 📡 API Reference

Base URL in development: `http://localhost:5000/api/todos`

| Method   | Endpoint          | Description                         |
|:---------|:------------------|:------------------------------------|
| `GET`    | `/api/todos`      | Fetch all todos                     |
| `GET`    | `/api/todos/:id`  | Fetch a single todo by ObjectID     |
| `POST`   | `/api/todos`      | Create a new todo                   |
| `PATCH`  | `/api/todos/:id`  | Mark a todo as completed            |
| `DELETE` | `/api/todos/:id`  | Delete a todo by ObjectID           |

---

### Request & Response Examples

#### 1. Get All Todos
- **Endpoint:** `GET /api/todos`
- **Response (`200 OK`):**
  ```json
  {
    "message": "data fetched successfully",
    "data": [
      {
        "id": "66e8574a2b16c888e2c2f4a1",
        "completed": false,
        "body": "Build Go and React application"
      }
    ]
  }
  ```

#### 2. Create a Todo
- **Endpoint:** `POST /api/todos`
- **Request Body:**
  ```json
  {
    "body": "Study MongoDB with Go driver"
  }
  ```
- **Response (`201 Created`):**
  ```json
  {
    "id": "66e8581e2b16c888e2c2f4a2",
    "completed": false,
    "body": "Study MongoDB with Go driver"
  }
  ```

#### 3. Update Todo (Mark as Completed)
- **Endpoint:** `PATCH /api/todos/66e8581e2b16c888e2c2f4a2`
- **Response (`200 OK`):**
  ```json
  {
    "message": "todo updated successfully"
  }
  ```

#### 4. Delete Todo
- **Endpoint:** `DELETE /api/todos/66e8581e2b16c888e2c2f4a2`
- **Response (`200 OK`):**
  ```json
  {
    "Msg": "todo deleted successfully!"
  }
  ```

---

## 📝 Data Model

### Go Struct (`main.go`)
```go
type Todo struct {
    ID        primitive.ObjectID `json:"id,omitempty" bson:"_id,omitempty"`
    Completed bool               `json:"completed"`
    Body      string             `json:"body"`
}
```

### TypeScript Interface (`client/src/components/TodoList .tsx`)
```typescript
export type Todo = {
    id: string;
    body: string;
    completed: boolean;
};
```

---

## 📜 Available Scripts

### Root Directory
- `air` – Runs backend server with live reload.
- `go run main.go` – Starts backend server directly.

### Client Directory (`cd client`)
- `npm run dev` – Starts Vite development server with HMR.
- `npm run build` – Compiles TypeScript and builds production distribution in `client/dist`.
- `npm run lint` – Runs ESLint checks.
- `npm run preview` – Previews the production build locally.
