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
  io.on('connection', (socket) => {
    const user_id = socket.handshake.auth._id
    users[user_id] = {
      socket_id: socket.id
    }

    console.log(users)

    socket.on('disconnect', () => {
      delete users[user_id]
      console.log(users)
    })
  })
}

export default initSocket
