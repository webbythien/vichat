"use client"

import { SocketContextProvider } from '@/context/SocketContext'
import React from 'react'

function SocketProvider({children}:{children: React.ReactNode}) {
  return (
    <SocketContextProvider>{children}</SocketContextProvider>
  )
}

export default SocketProvider