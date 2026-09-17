import { Container, Stack } from "@chakra-ui/react"
import Navbar from "./components/Navbar"
import TodoForm from "./components/TodoForm"
import TodoList from "./components/TodoList "

export const API_URL = import.meta.env.VITE_API_URL;


function App() {


  return (
    <Stack height="100vh ">
      <Navbar />
      <Container>
        <TodoForm />
        <TodoList />

      </Container>
    </Stack>
  )
}

export default App
