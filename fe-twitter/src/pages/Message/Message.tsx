import { useContext, useEffect } from 'react'
import Header from 'src/components/Header'
import { AppContext } from 'src/contexts/app.context'
import socket from 'src/utils/socket'
import MessageContainer from './Component/MessageContainer'

export default function Message() {
  const { profile } = useContext(AppContext)
  useEffect(() => {
    socket.auth = {
      _id: profile?._id
    }
    socket.connect()

    return () => {
      socket.disconnect() // ngắt kết nối khi về trang home
    }
  }, [])
  return (
    <>
      <Header label='Message' showBackArrow />
      <MessageContainer />
    </>
  )
}
