import { envConfig } from '~/constants/config'
import { TokenType, UserVerifyStatus } from '~/constants/enums'
import { signToken, verifyToken } from '~/utils/jwt'
import databaseService from './database.services'
import RefreshToken from '~/models/schemas/RefreshToken.schema'
import { ObjectId } from 'mongodb'
import { RegisterReqBody } from '~/models/requests/User.requests'
import User from '~/models/schemas/User.schema'
import { hashPassword } from '~/utils/crypto'
import { sendVerifyRegisterEmail } from '~/utils/email'
import { USERS_MESSAGES } from '~/constants/messages'

class UsersService {
  // Tạo access token
  private signAccessToken({ user_id, verify }: { user_id: string; verify: UserVerifyStatus }) {
    return signToken({
      payload: {
        user_id,
        token_type: TokenType.AccessToken,
        verify
      },
      privateKey: envConfig.jwtSecretAccessToken,
      options: {
        expiresIn: envConfig.accessTokenExpiresIn // thời gian hết hạn token
      }
    })
  }
  // tạo refresh token
  private signRefreshToken({ user_id, verify, exp }: { user_id: string; verify: UserVerifyStatus; exp?: number }) {
    if (exp) {
      return signToken({
        payload: {
          user_id,
          token_type: TokenType.RefreshToken,
          verify,
          exp // Thời gian hết hạn token
        },
        privateKey: envConfig.jwtSecretRefreshToken
      })
    }
    return signToken({
      payload: {
        user_id,
        token_type: TokenType.RefreshToken,
        verify
      },
      privateKey: envConfig.jwtSecretRefreshToken,

      options: {
        expiresIn: envConfig.refreshTokenExpiresIn // thời gian hết hạn token
      }
    })
  }
  // Tạo access token và refresh token
  private signAccessAndRefreshToken({ user_id, verify }: { user_id: string; verify: UserVerifyStatus }) {
    // chạy song song 2 func =>> tối ưu performance
    return Promise.all([this.signAccessToken({ user_id, verify }), this.signRefreshToken({ user_id, verify })])
  }
  // Tạo email verify token
  private signEmailVerifyToken({ user_id, verify }: { user_id: string; verify: UserVerifyStatus }) {
    return signToken({
      payload: {
        user_id,
        token_type: TokenType.EmailVerifyToken,
        verify
      },
      privateKey: envConfig.jwtSecretEmailVerifyToken as string,
      options: {
        expiresIn: envConfig.emailVerifyTokenExpiresIn // thời gian hết hạn token
      }
    })
  }
  //
  private decodeRefreshToken(refresh_token: string) {
    return verifyToken({
      token: refresh_token,
      secretOrPublicKey: envConfig.jwtSecretRefreshToken as string
    })
  }
  async checkEmailExist(email: string) {
    const user = await databaseService.users.findOne({ email })
    return Boolean(user)
  }
  // Đăng kí
  async register(payload: RegisterReqBody) {
    const user_id = new ObjectId() // Tạo user_id
    const email_verify_token = await this.signEmailVerifyToken({
      user_id: user_id.toString(),
      verify: UserVerifyStatus.Unverified
    })
    await databaseService.users.insertOne(
      new User({
        ...payload,
        _id: user_id,
        username: `user${user_id.toString()}`,
        email_verify_token,
        date_of_birth: new Date(payload.date_of_birth), // chuyển isoString ->> date
        password: hashPassword(payload.password)
      })
    )
    const [access_token, refresh_token] = await this.signAccessAndRefreshToken({
      user_id: user_id.toString(),
      verify: UserVerifyStatus.Unverified
    })
    const { iat, exp } = await this.decodeRefreshToken(refresh_token)
    await databaseService.refreshTokens.insertOne(
      new RefreshToken({
        user_id: new ObjectId(user_id),
        token: refresh_token,
        iat,
        exp
      })
    )
    await sendVerifyRegisterEmail(payload.email, email_verify_token)
    console.log(email_verify_token)
    return {
      access_token,
      refresh_token
    }
  }
  // Login - tạo access token và refresh token
  async login({ user_id, verify }: { user_id: string; verify: UserVerifyStatus }) {
    const [access_token, refresh_token] = await this.signAccessAndRefreshToken({ user_id, verify })
    const { iat, exp } = await this.decodeRefreshToken(refresh_token)
    await databaseService.refreshTokens.insertOne(
      new RefreshToken({
        user_id: new ObjectId(user_id),
        token: refresh_token,
        iat,
        exp
      })
    )
    return {
      access_token,
      refresh_token
    }
  }

  // Refresh token
  async refreshToken({
    user_id,
    verify,
    refresh_token,
    exp
  }: {
    user_id: string
    verify: UserVerifyStatus
    refresh_token: string
    exp: number
  }) {
    // Tạo mới access token và refresh token, xóa refresh token cũ
    const [new_access_token, new_refresh_token] = await Promise.all([
      this.signAccessToken({ user_id, verify }),
      this.signRefreshToken({ user_id, verify, exp }),
      databaseService.refreshTokens.deleteOne({ token: refresh_token })
    ])
    const decoded_refresh_token = await this.decodeRefreshToken(new_refresh_token)
    // Thêm refresh token mới vào DB
    await databaseService.refreshTokens.insertOne(
      new RefreshToken({
        user_id: new ObjectId(user_id),
        token: new_refresh_token,
        iat: decoded_refresh_token.iat,
        exp: decoded_refresh_token.exp
      })
    )
    return {
      access_token: new_access_token,
      refresh_token: new_refresh_token
    }
  }

  // Logout - Xoá refresh token trong database
  async logout(refresh_token: string) {
    await databaseService.refreshTokens.deleteOne({ token: refresh_token })
    return {
      message: USERS_MESSAGES.LOGOUT_SUCCESS
    }
  }
}

const usersService = new UsersService()
export default usersService
