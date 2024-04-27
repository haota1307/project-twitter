import React, { useEffect } from 'react'
import { io } from 'socket.io-client'

export default function Message() {
  useEffect(() => {
    const socket = io('http://localhost:4000')
    socket.on('connect', () => {
      console.log(socket.id)
    })

    socket.on('disconnect', () => {
      console.log(socket.id) // undefined
    })

    return () => {
      socket.disconnect() // ngắt kết nối khi về trang home
    }
  }, [])
  return <div>message</div>
}
