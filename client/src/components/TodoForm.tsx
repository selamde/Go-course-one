import { Box, Button, Input, Spinner } from '@chakra-ui/react'
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react'
import { FaPlus } from 'react-icons/fa'
import { queryClient } from '../main';
import { API_URL } from '../App';



const TodoForm = () => {
  const [todo, setTodo] = useState("");
  const [isPending, setIsPending] = useState(false);

const createMutation = useMutation({
      mutationFn: async(body:string)=>{
        const res = await fetch(`${API_URL}`,{
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({body})
        })
        if(!res.ok){
          throw new Error("Unable to create the todo!")
        }
        return res.json()
      },
      onSuccess: ()=> queryClient.invalidateQueries({queryKey:['todos']})
      
    
})


  


  const handleAddTodo =async (e: React.FormEvent  ) =>{
    setIsPending(true)
    e.preventDefault();

    createMutation.mutate(todo)
    setTodo("")
    setIsPending(false)
  }

  return (
     <>
       <Box className=' md:!mx-100 '>
        <form onSubmit={handleAddTodo} className='flex justify-center items-center !gap-5'>
         <Input name="todo" required value={todo} onChange={(e)=> setTodo(e.target.value)} placeholder='Enter task' />
           <Button type='submit' disabled={isPending}>
            {isPending? <Spinner size={"xs"} /> :   <FaPlus />}
          
           </Button>
        </form>
      
       </Box>
       </>
  )
}

export default TodoForm