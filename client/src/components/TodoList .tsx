import { Box, Spinner, Stack } from "@chakra-ui/react"
import { useQuery } from "@tanstack/react-query"

import Todoitem from "./Todoitem"
import { API_URL } from "../App"



export type Todo = {
  id:string
  body:string
  completed:boolean
} 


const TodoList  = () => {

 const {data:todos,isLoading } = useQuery<Todo[]>({
   
    queryKey:["todos"],
    queryFn: async ()=>{
      try{
      const res = await fetch(`${API_URL}`);
      const data = await res.json();
      
      if(!res.ok){
        throw new Error("Error fetchin data", data.err)
      }
      
  return data.data
    }catch(err){
      console.log(err)

    }

    },
    staleTime: 1000 * 60 * 5
    
  })
  return (
  <>
  <Box className="flex justify-center items-center !mt-10 !mb-8">
    <h1 className="!text-5xl !font-extrabold">Today&apos;s Task </h1>
  </Box>
  <Stack className="md:!mx-90">
{
  isLoading ? <Spinner /> : todos?.length === 0 ?(<p>No todos yet</p>): (
    todos?.map((todo)=>{
    console.log("TODO:", todo);
  console.log("TODO ID:", todo.id);
      return(
          <Todoitem key={todo.id} id={todo.id} body={todo.body} completed={todo.completed} />
 
      )
    }

    
 
    )
  )
}
  </Stack>
  
 
  </>
  )
}

export default TodoList 