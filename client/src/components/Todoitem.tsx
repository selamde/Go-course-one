import { Box, Button } from '@chakra-ui/react'
import { useMutation } from '@tanstack/react-query'

import { FaCheckCircle, FaTrash } from 'react-icons/fa'
import { queryClient } from '../main'
import { API_URL } from '../App'



type TodoItemProps ={
    id:string,
    body:string,
    completed: boolean
}

const Todoitem = ({id, body, completed}: TodoItemProps) => {

     const mutation = useMutation({
            mutationFn: async (id:string)=>{
                console.log("Patch id: ", id)
                const res = await fetch(`${API_URL}/${id}`,
                    {
                        method: "PATCH",

                    }
                    
                );
                if(!res.ok){
                     throw new Error("Failed to update")   
                    }
                return res.json()
            },
            onSuccess: () => queryClient.invalidateQueries({queryKey:['todos']})
        });

        const deleteMutation = useMutation({
            mutationFn: async (id:string)=>{

                const res = await fetch(`${API_URL}/${id}`,
                    {
                        method:"DELETE"
                    }
                )
                if(!res.ok){
                    throw new Error("Faield to delete the todo!")
                }
                
                return res.json()

            },
            onSuccess: ()=> queryClient.invalidateQueries({queryKey:['todos']})
        })

    const handleUpdate = async (id:string)=>{
        mutation.mutate(id)
       
    }

    const handleDelete = async (id:string) =>{
        deleteMutation.mutate(id)
    }
  return (
    <div  key={id} className=" flex items-center gap-2 mb-5">
     <Box className=" flex flex-1 md:flex-2 justify-between items-center !border !rounded-md !py-2 !px-4">
    <div className='md:!text-2xl !text-xl'>{completed? (<del className='text-red-500'>{body}</del>) :(<p>{body}</p>)}</div>
    <span className={`!py-1 !px-2 ${completed? "bg-green-500 " : "bg-yellow-500"}`}>{completed ? "Done" : "In Progress"}</span>
  </Box>
  <div className="!flex !flex-row gap-2"
  
  
  >
      <Button disabled={completed} onClick={()=> handleUpdate(id)} bg={"white"}><FaCheckCircle className="text-green-700 !w-5 !h-5 md:!w-7 md:!h-7" /></Button>
      <Button bg={"white"} onClick={()=> handleDelete(id)} ><FaTrash className="text-red-700  !w-5 !h-5 md:!w-7 md:!h-7" /></Button>

  </div>

 

 </div>
  )
}

export default Todoitem