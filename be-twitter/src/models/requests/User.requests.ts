// Định nghĩa interface requests body gửi lên
import { ParamsDictionary } from 'express-serve-static-core'
import { JwtPayload } from 'jsonwebtoken'
import { TokenType, UserVerifyStatus } from '~/constants/enums'
import { UserRole } from '~/models/schemas/User.schema'

export interface UpdateProfileReqBody {
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
  date_of_birth?: string
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
  role: UserRole
  verify: UserVerifyStatus
  exp: number
  iat: number
}

export interface FollowReqBody {
  followed_user_id: string
}

export interface FollowingReqBody {
  user_id: string
}

export interface UnFollowReqBody extends ParamsDictionary {
  user_id: string
}
