import { Collection, Db, MongoClient } from 'mongodb'
import dotenv from 'dotenv'
import { envConfig } from '~/constants/config'
import User from '~/models/schemas/User.schema'
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
}

const databaseService = new DatabaseService()
export default databaseService
