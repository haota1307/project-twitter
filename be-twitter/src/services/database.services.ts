import { Collection, Db, MongoClient } from 'mongodb'
import dotenv from 'dotenv'
import { envConfig } from '~/constants/config'
import User from '~/models/schemas/User.schema'
import RefreshToken from '~/models/schemas/RefreshToken.schema'
import Follower from '~/models/schemas/Follower.schema'
import VideoStatus from '~/models/schemas/VideoStatus.schema'
import Tweet from '~/models/schemas/Tweet.schema'
import Hashtag from '~/models/schemas/Hashtag.schema'
dotenv.config()

const uri = `mongodb+srv://${envConfig.dbUsername}:${envConfig.dbPassword}@twiiter.autqtc5.mongodb.net/`

class DatabaseService {
  private client: MongoClient
  private db: Db
  constructor() {
    this.client = new MongoClient(uri)
    this.db = this.client.db('twitter-project')
  }
  async connect() {
    try {
      await this.db.command({ ping: 1 })
      console.log('Pinged your deployment. You successfully connected to MongoDB!')
    } catch (error) {
      console.log('Error: ', error)
      throw error
    }
  }

  // Truy xuất dữ liệu đến collection users nêu chưa có thì tự tạo
  get users(): Collection<User> {
    return this.db.collection(envConfig.dbUsersCollection)
  }

  get refreshTokens(): Collection<RefreshToken> {
    return this.db.collection(envConfig.dbRefreshTokensCollection)
  }

  // Collection follow
  get followers(): Collection<Follower> {
    return this.db.collection(envConfig.dbFollowersCollection)
  }

  // Collection VideoStatus
  get videoStatus(): Collection<VideoStatus> {
    return this.db.collection(envConfig.dbVideoStatusCollection)
  }

  // Collection Tweet
  get tweets(): Collection<Tweet> {
    return this.db.collection(envConfig.dbTweetsCollection)
  }

  // Collection hashtags
  get hashtags(): Collection<Hashtag> {
    return this.db.collection(envConfig.dbHashtagsCollection)
  }
}

const databaseService = new DatabaseService()
export default databaseService
