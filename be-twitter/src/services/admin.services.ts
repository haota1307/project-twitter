import { ObjectId } from 'mongodb'
import databaseService from '~/services/database.services' // Đây là service để kết nối và thao tác với MongoDB

class AdminService {
  async getListUsers({ limit, page }: { limit: number; page: number }) {
    try {
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
    } catch (error) {
      console.error('Error fetching users:', error)
      throw new Error('Failed to fetch users')
    }
  }

  async getListTweets({ limit, page }: { limit: number; page: number }) {
    try {
      const [tweets, total] = await Promise.all([
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
        tweets,
        total
      }
    } catch (error) {
      console.error('Error fetching tweets:', error)
      throw new Error('Failed to fetch tweets')
    }
  }

  async BanUsers(userId: string, payload: any) {
    try {
      // Kiểm tra nếu có date_of_birth thì chuyển nó sang kiểu date
      const _payload = payload.date_of_birth ? { ...payload, date_of_birth: new Date(payload.date_of_birth) } : payload

      // Tạo object để cập nhật
      const updateObject: any = {
        ..._payload, // Ép kiểu _payload thành any để tránh lỗi khi sử dụng với $set
        verify: 2 // Cập nhật trạng thái verify
      }

      // Nếu có ban_info thì thêm vào updateObject
      if (payload.ban_info) {
        updateObject.ban_info = {
          ban_start_date: new Date(), // Ngày bắt đầu ban
          ban_end_date: payload.ban_info.ban_end_date ? new Date(payload.ban_info.ban_end_date) : undefined, // Ngày kết thúc ban
          ban_reason: payload.ban_info.ban_reason || '' // Lý do ban
        }
      }

      // Sử dụng đối tượng $set để cập nhật các trường cần thiết và $currentDate cho updated_at
      const updateQuery = {
        $set: updateObject,
        $currentDate: { updated_at: true }
      }

      // Tìm người dùng và cập nhật thông tin
      const user = await databaseService.users.findOneAndUpdate({ _id: new ObjectId(userId) }, updateQuery as any, {
        returnDocument: 'after',
        projection: { password: 0, email_verify: 0, forgot_password_token: 0 }
      })

      return user
    } catch (error) {
      console.error('Error banning user:', error)
      throw new Error('Failed to ban user')
    }
  }

  async processBanEnd(userId: string) {
    try {
      const objectId = new ObjectId(userId) // Chuyển đổi userId sang ObjectId để sử dụng trong truy vấn

      const updatedUser = await databaseService.users.findOneAndUpdate(
        { _id: objectId },
        {
          $set: {
            ban_info: null,
            verify: 0, // Đặt ban_info thành null để mở khóa người dùng
            updated_at: new Date() // Cập nhật thời gian updated_at
          }
        },
        { returnDocument: 'after' }
      )

      if (updatedUser) {
        console.log(`User ${userId} has been unbanned.`)
        // Ở đây bạn có thể thực hiện các hành động khác sau khi mở khóa, ví dụ gửi email thông báo, log sự kiện, ...
      } else {
        console.log(`User ${userId} not found or already unbanned.`)
        // Xử lý trường hợp không tìm thấy người dùng hoặc người dùng đã được mở khóa trước đó
      }
    } catch (error) {
      console.error('Error processing ban end:', error)
      // Xử lý lỗi khi có lỗi xảy ra trong quá trình cập nhật người dùng
    }
  }
}

const adminService = new AdminService()
export default adminService
