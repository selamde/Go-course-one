import { ChakraProvider, defaultSystem } from '@chakra-ui/react'
import React from 'react'
import { ColorModeProvider } from './ui/color-mode'

export function Provider ({children}: {children:React.ReactNode}) {
  return (
    <ChakraProvider value={defaultSystem}>
      <ColorModeProvider>
      {children}
      </ColorModeProvider>
      </ChakraProvider>
  )
}

