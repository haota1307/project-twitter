import express from 'express'
import dotenv from 'dotenv'
import { envConfig, isProduction } from './constants/config'
import usersRouter from './routes/users.routes'
import databaseService from './services/database.services'
import { defaultErrorHandler } from './middlewares/error.middlewares'
import cors, { CorsOptions } from 'cors'
import mediasRouter from './routes/medias.routes'
import { initFolder } from './utils/file'
import staticRouter from './routes/static.routes'
import tweetsRouter from './routes/tweets.routes'

dotenv.config()

const port = envConfig.port
const app = express()
// Tạo folder uploads
initFolder()

const corsOptions: CorsOptions = {
  // origin: isProduction ? envConfig.clientUrl : '*'
  origin: '*'
}
app.use(cors(corsOptions)) // Cho phép các host nào được truy cập vào

// Kết nối tới database
databaseService.connect()

app.use(express.json())
app.use('/users', usersRouter)
app.use('/medias', mediasRouter)
app.use('/static', staticRouter)
app.use('/tweets', tweetsRouter)

// Dùng middlewares để xử lý lỗi - Khi app lỗi sẽ nhãy vào đây  <<Default handler>>
app.use(defaultErrorHandler)

app.listen(port, () => {
  console.log(`Server Twitter clone đang chạy trên ${port}`)
})
