import { Router } from 'express'
import { randomUserController } from '~/controllers/randoms.controller'

import { wrapRequestHandler } from '~/utils/handlers'

const randomRouter = Router()

randomRouter.post('/users', wrapRequestHandler(randomUserController))

export default randomRouter
