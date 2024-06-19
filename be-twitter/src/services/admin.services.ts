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
}

const adminService = new AdminService()
export default adminService
