import { envConfig } from '~/constants/config'
import { TokenType, UserVerifyStatus } from '~/constants/enums'
import { signToken, verifyToken } from '~/utils/jwt'
import databaseService from './database.services'
import RefreshToken from '~/models/schemas/RefreshToken.schema'
import { ObjectId } from 'mongodb'
import { RegisterReqBody, UpdateProfileReqBody } from '~/models/requests/User.requests'
import User from '~/models/schemas/User.schema'
import { hashPassword } from '~/utils/crypto'
import { sendForgotPasswordEmail, sendVerifyRegisterEmail } from '~/utils/email'
import { USERS_MESSAGES } from '~/constants/messages'
import { ErrorWithStatus } from '~/models/Errors'
import HTTP_STATUS from '~/constants/httpStatus'
import Follower from '~/models/schemas/Follower.schema'
import axios from 'axios'
import { config } from 'dotenv'
config()
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

  // Giải mã Refresh Token
  private decodeRefreshToken(refresh_token: string) {
    return verifyToken({
      token: refresh_token,
      secretOrPublicKey: envConfig.jwtSecretRefreshToken as string
    })
  }

  // Tạo forgot password token
  private signForgotPasswordToken({ user_id, verify }: { user_id: string; verify: UserVerifyStatus }) {
    return signToken({
      payload: {
        user_id,
        token_type: TokenType.ForgotPasswordToken,
        verify
      },
      privateKey: envConfig.jwtSecretForgotPasswordToken as string,
      options: {
        expiresIn: envConfig.forgotPasswordTokenExpiresIn // thời gian hết hạn token
      }
    })
  }

  // lấy token
  private async getOAuthGoogleToken(code: string) {
    const body = {
      code,
      client_id: envConfig.googleClientId,
      client_secret: envConfig.googleClientSecret,
      redirect_uri: envConfig.googleRedirectUri,
      grant_type: 'authorization_code'
    }
    // Gửi data lên api
    const { data } = await axios.post('https://oauth2.googleapis.com/token', body, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
    return data as {
      access_token: string
      id_token: string
    }
  }

  // Lấy thông tin user
  private async getGoogleUserInfo(access_token: string, id_token: string) {
    const { data } = await axios.get('https://www.googleapis.com/oauth2/v1/userinfo', {
      params: {
        access_token,
        alt: 'json'
      },
      headers: {
        Authorization: `Bearer ${id_token}`
      }
    })
    return data as {
      id: string
      email: string
      verified_email: boolean
      name: string
      given_name: string
      family_name: string
      picture: string
      locale: string
    }
  }

  // Check tồn tại email
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

  // Login với google
  async oauth(code: string) {
    const { id_token, access_token } = await this.getOAuthGoogleToken(code)
    const userInfo = await this.getGoogleUserInfo(access_token, id_token)
    if (!userInfo.verified_email) {
      throw new ErrorWithStatus({
        message: USERS_MESSAGES.GMAIL_NOT_VERIFIED,
        status: HTTP_STATUS.BAD_REQUEST
      })
    }
    // Kiểm tra email đã được đăng kí hay chưa
    const user = await databaseService.users.findOne({ email: userInfo.email })
    // nếu tồn tại =>> cho login vào
    if (user) {
      const [access_token, refresh_token] = await this.signAccessAndRefreshToken({
        user_id: user._id.toString(),
        verify: user.verify
      })
      const { iat, exp } = await this.decodeRefreshToken(refresh_token)
      // chèn refresh token vào database
      await databaseService.refreshTokens.insertOne(
        new RefreshToken({ user_id: user._id, token: refresh_token, iat, exp })
      )
      return {
        access_token,
        refresh_token,
        newUser: 0,
        verify: user.verify
      }
    } else {
      const password = Math.random().toString(36).substring(2, 15)
      // nếu không thì đăng ký
      const data = await this.register({
        email: userInfo.email,
        name: userInfo.name,
        date_of_birth: new Date().toISOString(),
        password,
        confirm_password: password
      })
      return { ...data, newUser: 1, verify: UserVerifyStatus.Unverified }
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

  // verify email
  async verifyEmail(user_id: string) {
    // Tạo giá trị cập nhật
    // MongoDB cập nhật giá trị
    const [token] = await Promise.all([
      this.signAccessAndRefreshToken({ user_id, verify: UserVerifyStatus.Verified }),
      databaseService.users.updateOne({ _id: new ObjectId(user_id) }, [
        {
          $set: {
            email_verify_token: '',
            verify: UserVerifyStatus.Verified,
            updated_at: '$$NOW'
          }
        }
      ])
    ])
    const [access_token, refresh_token] = token
    const { iat, exp } = await this.decodeRefreshToken(refresh_token)

    await databaseService.refreshTokens.insertOne(
      new RefreshToken({ user_id: new ObjectId(user_id), token: refresh_token, iat, exp })
    )
    return {
      access_token,
      refresh_token
    }
  }

  // resend email
  async resendVerifyEmail(user_id: string, email: string) {
    // Test gửi email
    const email_verify_token = await this.signEmailVerifyToken({
      user_id,
      verify: UserVerifyStatus.Unverified
    })
    await sendVerifyRegisterEmail(email, email_verify_token)

    // Cập nhật lại giá trị email verify token trong document user
    await databaseService.users.updateOne(
      { _id: new ObjectId(user_id) },
      {
        $set: {
          email_verify_token
        },
        $currentDate: {
          updated_at: true
        }
      }
    )

    return {
      message: USERS_MESSAGES.RESEND_VERIFY_EMAIL_SUCCESS
    }
  }

  // Logout - Xoá refresh token trong database
  async logout(refresh_token: string) {
    await databaseService.refreshTokens.deleteOne({ token: refresh_token })
    return {
      message: USERS_MESSAGES.LOGOUT_SUCCESS
    }
  }

  // forgot password
  async forgotPassword({ user_id, email, verify }: { user_id: string; email: string; verify: UserVerifyStatus }) {
    // tạo forgot password token
    const forgot_password_token = await this.signForgotPasswordToken({
      user_id,
      verify
    })
    // Cập nhật vào document user
    await databaseService.users.updateOne({ _id: new ObjectId(user_id) }, [
      {
        $set: {
          forgot_password_token,
          updated_at: '$$NOW'
        }
      }
    ])
    // Gửi email kèm đường link đến email người dùng: https://twitter.com/forgot-password?token=token
    await sendForgotPasswordEmail(email, forgot_password_token)

    return {
      message: USERS_MESSAGES.CHECK_EMAIL_TO_RESET_PASSWORD
    }
  }

  // Reset password
  async resetPassword(user_id: string, password: string) {
    databaseService.users.updateOne(
      { _id: new ObjectId(user_id) },
      {
        $set: {
          forgot_password_token: '',
          password: hashPassword(password)
        },
        $currentDate: {
          updated_at: true
        }
      }
    )
    return {
      message: USERS_MESSAGES.RESET_PASSWORD_SUCCESS
    }
  }

  // change password
  async changePassword(user_id: string, new_password: string) {
    databaseService.users.updateOne(
      { _id: new ObjectId(user_id) },
      {
        $set: {
          password: hashPassword(new_password)
        },
        $currentDate: {
          updated_at: true
        }
      }
    )
    return {
      message: USERS_MESSAGES.CHANGE_PASSWORD_SUCCESS
    }
  }

  // Get profile
  async getProfile(user_id: string) {
    const users = await databaseService.users
      .aggregate<User>([
        {
          $match: {
            _id: new ObjectId(user_id)
          }
        },
        {
          $lookup: {
            from: 'followers',
            localField: '_id',
            foreignField: 'user_id',
            as: 'following'
          }
        },
        {
          $lookup: {
            from: 'users',
            localField: 'following.followed_user_id',
            foreignField: '_id',
            as: 'following'
          }
        },
        {
          $lookup: {
            from: 'followers',
            localField: '_id',
            foreignField: 'followed_user_id',
            as: 'followed'
          }
        },
        {
          $lookup: {
            from: 'users',
            localField: 'followed.user_id',
            foreignField: '_id',
            as: 'followed'
          }
        },
        {
          $addFields: {
            following_count: {
              $size: '$following'
            },
            followed_count: {
              $size: '$followed'
            }
          }
        },
        {
          $project: {
            password: 0,
            email_verify_token: 0,
            forgot_password_token: 0,
            following: 0,
            followed: 0
          }
        }
      ])
      .toArray()
    if (users.length === 0) {
      throw new ErrorWithStatus({
        message: USERS_MESSAGES.USER_NOT_FOUND,
        status: HTTP_STATUS.NOT_FOUND
      })
    }
    return users.map((user) => {
      return user
    })
  }

  // Update profile
  async updateProfile(user_id: string, payload: UpdateProfileReqBody) {
    // Kiểm tra nếu có date of birth thì chuyển nó sang kiểu date - do khác kiểu dữ liệu với $set
    const _payload = payload.date_of_birth ? { ...payload, date_of_birth: new Date(payload.date_of_birth) } : payload
    // dùng findOneAndUpdate để sau khi người dùng cập nhật thì ta sẽ trả về luôn thông tin người dùng
    const user = await databaseService.users.findOneAndUpdate(
      {
        _id: new ObjectId(user_id)
      },
      {
        $set: {
          ...(_payload as UpdateProfileReqBody & { date_of_birth?: Date })
        },
        $currentDate: {
          updated_at: true
        }
      },
      {
        returnDocument: 'after', // Trả về document sau khi update
        projection: {
          // Không trả về
          password: 0,
          email_verify: 0,
          forgot_password_token: 0
        }
      }
    )
    // Trả về Document user
    return user
  }

  // Get user profile
  async getUserProfile(username: string) {
    const users = await databaseService.users
      .aggregate<User>([
        {
          $match: {
            username: username
          }
        },
        {
          $lookup: {
            from: 'followers',
            localField: '_id',
            foreignField: 'user_id',
            as: 'following'
          }
        },
        {
          $lookup: {
            from: 'users',
            localField: 'following.followed_user_id',
            foreignField: '_id',
            as: 'following'
          }
        },
        {
          $lookup: {
            from: 'followers',
            localField: '_id',
            foreignField: 'followed_user_id',
            as: 'followed'
          }
        },
        {
          $lookup: {
            from: 'users',
            localField: 'followed.user_id',
            foreignField: '_id',
            as: 'followed'
          }
        },
        {
          $addFields: {
            following_count: {
              $size: '$following'
            },
            followed_count: {
              $size: '$followed'
            }
          }
        },
        {
          $project: {
            password: 0,
            email_verify_token: 0,
            forgot_password_token: 0,
            following: 0,
            followed: 0
          }
        }
      ])
      .toArray()
    if (users.length === 0) {
      throw new ErrorWithStatus({
        message: USERS_MESSAGES.USER_NOT_FOUND,
        status: HTTP_STATUS.NOT_FOUND
      })
    }
    return users.map((user) => {
      return user
    })
  }

  // Follow some one
  async follow(user_id: string, followed_user_id: string) {
    const follower = await databaseService.followers.findOne({
      user_id: new ObjectId(user_id),
      followed_user_id: new ObjectId(followed_user_id)
    })
    if (follower === null) {
      await databaseService.followers.insertOne(
        new Follower({
          user_id: new ObjectId(user_id),
          followed_user_id: new ObjectId(followed_user_id)
        })
      )
      return {
        message: USERS_MESSAGES.FOLLOW_SUCCESS
      }
    }
    return {
      message: USERS_MESSAGES.FOLLOWED
    }
  }

  // Get list following
  async following({ user_id, limit, page }: { user_id: string; limit: number; page: number }) {
    const isFollower = await databaseService.followers
      .find({
        user_id: new ObjectId(user_id)
      })
      .sort({ created_at: -1 })
      .skip(limit * (page - 1))
      .limit(limit)
      .toArray()
    const total = await databaseService.followers.countDocuments({ user_id: new ObjectId(user_id) })
    return { isFollower, total }
  }

  // un follow
  async unFollow(user_id: string, followed_user_id: string) {
    // Check đã follow hay chưa
    const followed = await databaseService.followers.findOne({
      user_id: new ObjectId(user_id),
      followed_user_id: new ObjectId(followed_user_id)
    })
    // Chưa follow
    if (followed === null) {
      return {
        message: USERS_MESSAGES.ALREADY_UNFOLLOWED
      }
    }
    // Đã follow
    await databaseService.followers.deleteOne({
      user_id: new ObjectId(user_id),
      followed_user_id: new ObjectId(followed_user_id)
    })
    return {
      message: USERS_MESSAGES.UNFOLLOW_SUCCESS
    }
  }
}

const usersService = new UsersService()
export default usersService
