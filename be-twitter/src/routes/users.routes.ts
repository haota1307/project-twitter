import { Router } from 'express'
import {
  changePasswordController,
  forgotPasswordController,
  loginController,
  logoutController,
  refreshTokenController,
  registerController,
  resetPasswordController,
  verifyForgotPasswordController
} from '~/controllers/users.controllers'
import {
  accessTokenValidator,
  changePasswordValidatior,
  forgotPasswordValidator,
  loginValidator,
  refreshTokenValidator,
  registerValidator,
  resetPasswordValidatior,
  verifiedUserValidator,
  verifyForgotPasswordTokenValidatior
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

/**
 * Description: submit email to reset password, send email to user
 * Path: /forgot-password
 * Method: POST
 * Body: { email: string }
 *
 */
usersRouter.post('/forgot-password', forgotPasswordValidator, wrapRequestHandler(forgotPasswordController))

/**
 * Description: Verify link in email to reset password
 * Path: /verify-forgot-password
 * Method: POST
 * Body: { forgot_password_token: string }
 *
 */
usersRouter.post(
  '/verify-forgot-password',
  verifyForgotPasswordTokenValidatior,
  wrapRequestHandler(verifyForgotPasswordController)
)

/**
 * Description: reset password befor after verify link in email to reset password
 * Path: /reset-password
 * Method: POST
 * Body: { forgot_password_token: string, password: string, confirm_password: string }
 *
 */
usersRouter.post('/reset-password', resetPasswordValidatior, wrapRequestHandler(resetPasswordController))

/**
 * Description: Change password
 * Path: /change-password
 * Method: PUT
 * Header: { Authorization: Bearer <access_token> }
 * Body: { old_password: string, password: string, confirm_password: string }
 *
 */
usersRouter.put(
  '/change-password',
  accessTokenValidator,
  verifiedUserValidator,
  changePasswordValidatior,
  wrapRequestHandler(changePasswordController)
)

/**
 * Description:  get my profile
 * Path: /me
 * Method: GET
 * Header: {Authorization: Bearer <access token>}
 */
//usersRouter.get('/me', accessTokenValidator, wrapRequestHandler(getMeController))

/**
 * Description:  Update my profile
 * Path: /me
 * Method: PATCH
 * Header: {Authorization: Bearer <access token>}
 * Body: UserSchema
 */
// usersRouter.patch(
//   '/me',
//   accessTokenValidator,
//   verifiedUserValidator,
//   updateMeValidator,
//   // Lọc ra những key cần lấy
//   filterMiddlewares<UpdateMeReqBody>([
//     'name',
//     'date_of_birth',
//     'bio',
//     'location',
//     'website',
//     'avatar',
//     'username',
//     'cover_photo'
//   ]),
//   wrapRequestHandler(updateMeController)
// )
export default usersRouter
