import express from 'express'
import dotenv from 'dotenv'
import { envConfig } from './constants/config'
import usersRouter from './routes/users.routes'
import databaseService from './services/database.services'
dotenv.config()

const port = envConfig.port
const app = express()

// Kết nối tới database
databaseService.connect()

app.use(express.json())
app.use('/users', usersRouter)

app.listen(port, () => {
  console.log(`Server Twitter clone đang chạy trên ${port}`)
})
