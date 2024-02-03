import databaseService from './database.services'

class RandomService {
  async randomUser(sizeList: number) {
    const users = await databaseService.users
      .aggregate([
        {
          $match: {
            verify: 1
          }
        },
        {
          $sample: {
            size: sizeList
          }
        },
        {
          $project: {
            password: 0,
            forgot_password_token: 0,
            email_verify_token: 0,
            twitter_circle: 0
          }
        }
      ])
      .toArray()

    return users.map((user) => {
      return user
    })
  }
}

const randomService = new RandomService()
export default randomService
