"use client"
import {  Button } from '@chakra-ui/react'
import { useColorMode } from './ui/color-mode';
import { CiLight } from 'react-icons/ci';
import { IoMoonOutline } from 'react-icons/io5';


const Navbar = () => {
    const {colorMode, toggleColorMode} = useColorMode();
  return (

    
    
        <div className=' flex flex-row justify-between items-center md:!py-5 !py-2 !rounded-2xl md:!px-5 px-2 !mx-5 md:!mx-10 !my-2'>
        <div className='flex items-center'>
            <h1 className='md:!text-5xl !text-2xl font-extrabold'>Task</h1>
            <img src="go.png" className='' height={60} width={60} alt="golang logo" />
            <h1 className='md:!text-5xl !text-2xl font-extrabold'>Flow</h1>
        </div>
        <div>
              
            <Button onClick={toggleColorMode} className='   Md:!text-5xl !text-2xl md:!w-25 md:!h-25 !rounded-full border border-black' bg={colorMode === "light"?("white"):("black")} color={colorMode=== "light"?("black"):("yellow")} >
                {colorMode === "light"? <IoMoonOutline className='!w-8 !h-8 ' />: <CiLight className='!w-8 !h-8' />  }
              
            </Button>
        </div>
    </div>


  )
}

export default Navbar