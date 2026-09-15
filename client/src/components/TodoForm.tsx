import { Box, Button, Input } from '@chakra-ui/react'
import { FaPlus } from 'react-icons/fa'

const TodoForm = () => {
  return (
     <>
       <Box className='flex justify-center items-center !mx-100 !gap-5'>
        
           <Input name="task" placeholder='Enter task' />
           <Button>
            <FaPlus />
           </Button>
       </Box>
       </>
  )
}

export default TodoForm