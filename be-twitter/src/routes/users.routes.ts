import { Router } from 'express'
import {
  changePasswordController,
  followController,
  followingController,
  forgotPasswordController,
  getProfileController,
  getUserProfileController,
  loginController,
  logoutController,
  oauthController,
  refreshTokenController,
  registerController,
  resendverifyEmailController,
  resetPasswordController,
  unfollowController,
  updateProfileController,
  verifyEmailController,
  verifyForgotPasswordController
} from '~/controllers/users.controllers'
import { filterMiddlewares } from '~/middlewares/common.middlewares'
import {
  accessTokenValidator,
  changePasswordValidatior,
  emailVerifyTokenValidator,
  followValidator,
  forgotPasswordValidator,
  loginValidator,
  refreshTokenValidator,
  registerValidator,
  resetPasswordValidatior,
  unfollowValidator,
  updateMeValidator,
  verifiedUserValidator,
  verifyForgotPasswordTokenValidatior
} from '~/middlewares/users.middlewares'
import { UpdateProfileReqBody } from '~/models/requests/User.requests'
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
 * Description: verify email when user click on the link in email => Verify account
 * Path: /verify-email
 * Method: POST
 * Body: { email_verify_token: string }
 *
 */
usersRouter.post('/verify-email', emailVerifyTokenValidator, wrapRequestHandler(verifyEmailController))

/**
 * Description: resend verify email when user click on the link in email
 * Path: /resend-verify-email
 * Method: POST
 * Header: {Authorization: Bearer <access token>}
 * Body: {  }
 *
 */
usersRouter.post('/resend-verify-email', accessTokenValidator, wrapRequestHandler(resendverifyEmailController))

/**
 * Description: Login account
 * Path: /login
 * Method: POST
 * Body: { email: string, password: string }
 */
usersRouter.post('/login', loginValidator, wrapRequestHandler(loginController))

/**
 * Description: OAuth with google
 * Path: /oauth/google
 * Method: GET
 * Query: { code: string }
 */
usersRouter.get('/oauth/google', wrapRequestHandler(oauthController))

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
 * Path: /profile
 * Method: GET
 * Header: {Authorization: Bearer <access token>}
 */
usersRouter.get('/profile', accessTokenValidator, wrapRequestHandler(getProfileController))

/**
 * Description:  Update my profile
 * Path: /me
 * Method: PATCH
 * Header: {Authorization: Bearer <access token>}
 * Body: UserSchema
 */
usersRouter.patch(
  '/profile',
  accessTokenValidator,
  verifiedUserValidator,
  updateMeValidator,
  // Lọc ra những key cần lấy
  filterMiddlewares<UpdateProfileReqBody>([
    'name',
    'date_of_birth',
    'bio',
    'location',
    'website',
    'avatar',
    'username',
    'cover_photo'
  ]),
  wrapRequestHandler(updateProfileController)
)

/**
 * Description:  get user profile
 * Path: /:username
 * Method: GET
 */
usersRouter.get('/user/:username', wrapRequestHandler(getUserProfileController))

/**
 * Description: Follow someone
 * Path: /follow
 * Method: POST
 * Header: { Authorization: Bearer <access_token> }
 * Body: { followed_user_id: string }
 */
usersRouter.post(
  '/follow',
  accessTokenValidator,
  verifiedUserValidator,
  followValidator,
  wrapRequestHandler(followController)
)

/**
 * Description: list follow
 * Path: /following
 * Method: Get
 * Header: { Authorization: Bearer <access_token> }
 */
usersRouter.get('/following', accessTokenValidator, wrapRequestHandler(followingController))

/**
 * Description:  unFollow someone
 * Path: /follow/user_id
 * Method: DELETE
 * Header: { Authorization: Bearer <access_token> }
 * Body: { followed_user_id: string }
 */
usersRouter.delete(
  '/follow/:user_id',
  accessTokenValidator,
  verifiedUserValidator,
  unfollowValidator,
  wrapRequestHandler(unfollowController)
)
export default usersRouter
