export enum UserVerifyStatus {
  Unverified, // chưa xác thực email, mặc định = 0
  Verified, // đã xác thực email
  Banned // bị khóa
}

export interface User {
  _id?: string
  name: string
  email: string
  date_of_birth: Date
  password: string
  created_at?: Date
  updated_at?: Date
  email_verify_token?: string
  forgot_password_token?: string
  verify?: UserVerifyStatus
  twitter_circle?: string[]
  bio?: string
  location?: string
  website?: string
  username?: string
  avatar?: string
  cover_photo?: string
  following?: string[]
  followed?: string[]
}
