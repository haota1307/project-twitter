import { Router } from 'express'
import {
  loginController,
  logoutController,
  refreshTokenController,
  registerController
} from '~/controllers/users.controllers'
import {
  accessTokenValidator,
  loginValidator,
  refreshTokenValidator,
  registerValidator
} from '~/middlewares/users.middlewares'
import { wrapRequestHandler } from '~/utils/handlers'

const usersRouter = Router()
/**
 * Description: Register a new user
 * Path: /register
 * Method: POST
 * Body: { name: string, email: string, password: string, confirm_password, date_of_birth: ISO8601 }
 */
usersRouter.post('/register', registerValidator, wrapRequestHandler(registerController))

/**
 * Description: Login account
 * Path: /login
 * Method: POST
 * Body: { email: string, password: string }
 */
usersRouter.post('/login', loginValidator, wrapRequestHandler(loginController))

/**
 * Description: Refresh token
 * Path: /refresh-token
 * Method: POST
 * Body: { refresh_token: string }
 *
 */
usersRouter.post('/refresh-token', refreshTokenValidator, wrapRequestHandler(refreshTokenController))

/**
 * Description: Logout a user
 * Path: /loguot
 * Method: POST
 * Header: {Authorization: Bearer <access_token>}
 * Body: { refresh_token: string }
 *
 */
usersRouter.post('/loguot', accessTokenValidator, refreshTokenValidator, wrapRequestHandler(logoutController))

export default usersRouter
