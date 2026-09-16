import { Box, Button, Input, Spinner } from '@chakra-ui/react'
import { useState } from 'react'
import { FaPlus } from 'react-icons/fa'

const TodoForm = () => {
  const [todo, setTodo] = useState("");
  const [isPending, setIsPending] = useState(false);


  const handleAddTodo =async (e: React.FormEvent  ) =>{
    setIsPending(true)
    e.preventDefault();

    alert("Todo Added!")
    setIsPending(false)
  }

  return (
     <>
       <Box className=' !mx-100 '>
        <form onSubmit={handleAddTodo} className='flex justify-center items-center !gap-5'>
         <Input name="todo" value={todo} onChange={(e)=> setTodo(e.target.value)} placeholder='Enter task' />
           <Button type='submit' disabled={isPending}>
            {isPending? <Spinner size={"xs"} /> :   <FaPlus />}
          
           </Button>
        </form>
      
       </Box>
       </>
  )
}

export default TodoForm