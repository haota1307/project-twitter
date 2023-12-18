// Định nghĩa interface requests body gửi lên
import { ParamsDictionary } from 'express-serve-static-core'
import { JwtPayload } from 'jsonwebtoken'
import { TokenType, UserVerifyStatus } from '~/constants/enums'

/**
 * @swagger
 * components:
 *   schemas:
 *     LoginBody:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           example: trananhhao.vnag+2@gmail.com
 *         password:
 *           type: string
 *           example: Abc@123
 *     SuccessAuthentication:
 *       type: object
 *       properties:
 *         result:
 *           type: object
 *           properties:
 *             access_token:
 *               type: string
 *               example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *             refresh_token:
 *               type: string
 *               example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *     User:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           format: MongoId
 *           example: 65561a3acb9e9c4794ff3936
 *         name:
 *           type: string
 *           example: Trần Hào
 *         email:
 *           type: string
 *           example: trananhhao.vnag+2@gmail.com
 *         date_of_birth:
 *           type: string
 *           format: ISO8601
 *           example: 2023-09-24T13:24:38.658Z
 *         created_at:
 *           type: string
 *           format: ISO8601
 *           example: 2023-11-16T13:33:46.328Z
 *         updated_at:
 *           type: string
 *           format: ISO8601
 *           example: 2023-11-16T13:33:46.328Z
 *         verify:
 *           $ref: '#/components/schemas/UserVerifyStatus'
 *         twitter_circle:
 *           type: array
 *           items:
 *             type: string
 *             format: MongoId
 *           example: ['65561a3acb9e9c4794ff3xxx', '65561a3acb9e9c4794ff3xxx']
 *         bio:
 *           type: string
 *           example: Xin chào tôi là
 *         location:
 *           type: string
 *           example: 'An Giang, Việt Nam'
 *         website:
 *           type: string
 *           example: 'www.abc.com'
 *         username:
 *           type: string
 *         avatar:
 *           type: string
 *           example: 'http:localhost:4000/images/avatars/abc.jpg'
 *         cover_photo:
 *           type: string
 *           example: 'http:localhost:4000/images/cover/abc.jpg'
 *     UserVerifyStatus:
 *       type: number
 *       enum: [Unverified, verified, Banned]
 *       example: 1
 */

export interface UpdateMeReqBody {
  name?: string
  date_of_birth?: string
  bio?: string
  location?: string
  website?: string
  username?: string
  avatar?: string
  cover_photo?: string
}

export interface LoginReqBody {
  email: string
  password: string
}

export interface RegisterReqBody {
  name: string
  email: string
  password: string
  confirm_password: string
  date_of_birth: string
}

export interface ChangePasswordReqBody {
  old_password: string
  password: string
  confirm_password: string
}

export interface verifyEmailReqBody {
  email_verify_token: string
}

export interface GetProfileReqParams extends ParamsDictionary {
  username: string
}

export interface LogoutReqBody {
  refresh_token: string
}

export interface RefreshTokenReqBody {
  refresh_token: string
}

export interface ForgotPasswordReqBody {
  email: string
}

export interface VerifyForgotPasswordReqBody {
  forgot_password_token: string
}

export interface ResetPasswordReqBody {
  password: string
  confirm_password: string
  forgot_password: string
}

export interface TokenPayload extends JwtPayload {
  user_id: string
  token_type: TokenType
  verify: UserVerifyStatus
  exp: number
  iat: number
}

export interface FollowReqBody {
  followed_user_id: string
}

export interface UnFollowReqBody extends ParamsDictionary {
  user_id: string
}
