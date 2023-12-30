import { Router } from 'express'
import { serveImageController, serveVideoStreamController } from '~/controllers/medias.controller'
const staticRouter = Router()
/** Hiển thị video và hình ảnh */

staticRouter.get('/image/:name', serveImageController)
staticRouter.get('/video-stream/:segment/:name', serveVideoStreamController)

export default staticRouter
