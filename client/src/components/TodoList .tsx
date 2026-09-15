import { Box, Button, Stack } from "@chakra-ui/react"
import { FaCheckCircle, FaTrash } from "react-icons/fa"

const sampleData = [
    {
        id:1,
        body: "Learn golang",
        completed: true
    },
        {
        id:1,
        body: "Learn python",
        completed: false
    },
        {
        id:1,
        body: "Learn scala",
        completed: true
    },
        {
        id:1,
        body: "Learn ruby",
        completed: false
    },
]


const TodoList  = () => {
  return (
  <>
  <Box className="flex justify-center items-center !mt-10 !mb-8">
    <h1 className="!text-5xl !font-extrabold">Today&apos;s Task </h1>
  </Box>
  <Stack className="!mx-90">
{sampleData.map((todo)=>(

 <div  key={todo.id} className=" flex items-center gap-2">
     <Box className=" flex flex-2 justify-between items-center !border !rounded-md !py-2 !px-4">
    <p>{todo.body}</p>
    <span className={`!py-1 !px-2 ${todo.completed? "bg-green-500 " : "bg-yellow-500"}`}>{todo.completed ? "Done" : "In Progress"}</span>
  </Box>
  <div className="!flex !flex-row gap-2"
  
  
  >
      <Button bg={"white"}><FaCheckCircle className="text-green-700  !w-7 !h-7" /></Button>
      <Button bg={"white"}  ><FaTrash className="text-red-700 !w-7 !h-7" /></Button>

  </div>

 

 </div>
 
    ))}
  </Stack>
  
 
  </>
  )
}

export default TodoList 