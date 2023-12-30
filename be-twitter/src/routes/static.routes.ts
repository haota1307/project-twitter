import { Router } from 'express'
import { serveImageController } from '~/controllers/medias.controller'
const staticRouter = Router()
/** Hiển thị video và hình ảnh */

staticRouter.get('/image/:name', serveImageController)

export default staticRouter
