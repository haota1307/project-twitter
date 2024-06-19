import { ObjectId } from 'mongodb'
import { UpdateProfileReqBody } from '~/models/requests/User.requests'
import databaseService from '~/services/database.services'

class AdminService {
  async getListUsers({ limit, page }: { limit: number; page: number }) {
    const [users, total] = await Promise.all([
      databaseService.users
        .aggregate([
          {
            $match: {
              role: 'user'
            }
          },
          {
            $skip: limit * (page - 1)
          },
          {
            $limit: limit
          },
          {
            $project: {
              _id: 1,
              name: 1,
              username: 1,
              email: 1,
              verify: 1
            }
          }
        ])
        .toArray(),
      databaseService.users.countDocuments({
        role: 'user'
      })
    ])

    return {
      users,
      total
    }
  }

  async getListTweets({ limit, page }: { limit: number; page: number }) {
    const [users, total] = await Promise.all([
      databaseService.tweets
        .aggregate([
          {
            $skip: limit * (page - 1)
          },
          {
            $limit: limit
          },
          {
            $project: {
              _id: 1,
              user_id: 1,
              content: 1,
              type: 1,
              parent_id: 1
            }
          }
        ])
        .toArray(),
      databaseService.tweets.countDocuments()
    ])

    return {
      users,
      total
    }
  }

  async BanUsers(userId: string, payload: any) {
    try {
      // Kiểm tra nếu có date_of_birth thì chuyển nó sang kiểu date
      const _payload = payload.date_of_birth ? { ...payload, date_of_birth: new Date(payload.date_of_birth) } : payload
      // Tìm người dùng và cập nhật thông tin
      const user = await databaseService.users.findOneAndUpdate(
        { _id: new ObjectId(userId) },
        {
          $set: {
            ...(_payload as any), // Ép kiểu _payload thành any để tránh lỗi khi sử dụng với $set
            ban_info: {
              // Tạo mới ban_info nếu chưa tồn tại
              ban_start_date: new Date(),
              ban_end_date: payload.ban_info.ban_end_date ? new Date(payload.ban_info.ban_end_date) : undefined,
              ban_reason: payload.ban_info.ban_reason || ''
            },
            verify: 2
          },
          $currentDate: { updated_at: true }
        },
        {
          returnDocument: 'after',
          projection: { password: 0, email_verify: 0, forgot_password_token: 0 }
        }
      )

      return user
    } catch (error) {
      console.error('Error banning user:', error)
      throw new Error('Failed to ban user')
    }
  }
}

const adminService = new AdminService()
export default adminService
