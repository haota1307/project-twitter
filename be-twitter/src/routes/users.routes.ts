import { Router } from 'express'
import { loginController } from '~/controllers/users.controllers'
import { loginValidator } from '~/middlewares/users.middlewares'
import { wrapRequestHandler } from '~/utils/handlers'

const usersRouter = Router()

usersRouter.post('/login', loginValidator, wrapRequestHandler(loginController))

export default usersRouter
