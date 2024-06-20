export enum UserVerifyStatus {
  Unverified, // chưa xác thực email, mặc định = 0
  Verified, // đã xác thực email
  Banned // bị khóa
}

export enum UserRole {
  User = 'user',
  Admin = 'admin'
}

interface BanInfoType {
  ban_start_date: Date
  ban_end_date: Date
  ban_reason?: string
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
  followed_count?: number
  following_count?: number
  ban_info?: BanInfoType | null // thông tin lệnh cấm
  role: UserRole // Vai trò người dùng
}
