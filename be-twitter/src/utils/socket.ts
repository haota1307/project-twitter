import { Server } from 'socket.io'
import { Server as ServerHttp } from 'http'

const initSocket = (httpServer: ServerHttp) => {
  const io = new Server(httpServer, {
    cors: {
      origin: 'http://localhost:3000'
    }
  })

  const users: {
    [key: string]: {
      socket_id: string
    }
  } = {}
  // middleware

  io.on('connection', (socket: any) => {
    console.log(`${socket.id} connect`)
    socket.on('disconnect', () => {
      console.log(`${socket.id} disconnect`) //Check disconnect
    })
  })
}

export default initSocket
