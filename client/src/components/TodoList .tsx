import { Box, Button, Spinner, Stack } from "@chakra-ui/react"
import { useQuery } from "@tanstack/react-query"

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
export type Todo = {
  _id:number
  body:string
  completed:boolean
} 


const TodoList  = ({todo} : {todo: Todo}) => {
  // const [isLoading, setIsLoading] = useState(false)
  // const[todosData, setTodosData] = useState([]);
 const {data:todos,isLoading } = useQuery<Todo[]>({
   
    queryKey:["todos"],
    queryFn: async ()=>{
      try{
      const res = await fetch("http://localhost:5000/api/todos");
      const data = await res.json();
      
      if(!res.ok){
        throw new Error("Error fetchin data", data.err)
      }
      
  return data.data
    }catch(err){
      console.log(err)

    }

    }
    
  })
  return (
  <>
  <Box className="flex justify-center items-center !mt-10 !mb-8">
    <h1 className="!text-5xl !font-extrabold">Today&apos;s Task </h1>
  </Box>
  <Stack className="!mx-90">
{
  isLoading ? <Spinner /> : (
    todos?.map((todo)=>(

 <div  key={todo._id} className=" flex items-center gap-2">
     <Box className=" flex flex-2 justify-between items-center !border !rounded-md !py-2 !px-4">
    <div>{todo.completed? (<del>{todo.body}</del>) :(<p>{todo.body}</p>)}</div>
    <span className={`!py-1 !px-2 ${todo.completed? "bg-green-500 " : "bg-yellow-500"}`}>{todo.completed ? "Done" : "In Progress"}</span>
  </Box>
  <div className="!flex !flex-row gap-2"
  
  
  >
      <Button bg={"white"}><FaCheckCircle className="text-green-700  !w-7 !h-7" /></Button>
      <Button bg={"white"}  ><FaTrash className="text-red-700 !w-7 !h-7" /></Button>

  </div>

 

 </div>
 
    ))
  )
}
  </Stack>
  
 
  </>
  )
}

export default TodoList 