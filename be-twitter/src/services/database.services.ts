import { Collection, Db, MongoClient } from 'mongodb'
import dotenv from 'dotenv'
import { envConfig } from '~/constants/config'
import User from '~/models/schemas/User.schema'
import RefreshToken from '~/models/schemas/RefreshToken.schema'
import Follower from '~/models/schemas/Follower.schema'
import VideoStatus from '~/models/schemas/VideoStatus.schema'
import Tweet from '~/models/schemas/Tweet.schema'
import Hashtag from '~/models/schemas/Hashtag.schema'
import { Bookmark } from '~/models/schemas/Bookmark.schema'
import { Like } from '~/models/schemas/Like.schema'
import Conversation from '~/models/schemas/Conversation.schema'
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

  // Tạo index tối ưu hiệu xuất tìm kiếm
  async indexUsers() {
    const exists = await this.users.indexExists(['email_1_password_1', 'username_1', 'email_1']) // Nếu không có bất kì 1 trong 3 sẽ return vể false
    if (!exists) {
      this.users.createIndex({ email: 1, password: 1 })
      this.users.createIndex({ email: 1 }, { unique: true }) // Không được trùng email
      this.users.createIndex({ username: 1 }, { unique: true }) // Không được trùng username
    }
  }

  async indexRefreshToken() {
    const exists = await this.refreshTokens.indexExists(['exp_1', 'token_1'])
    if (!exists) {
      this.refreshTokens.createIndex({ token: 1 })
      this.refreshTokens.createIndex({ exp: 1 }, { expireAfterSeconds: 0 }) //=> Dựa vào móc thời gian exp để xóa token
    }
  }

  async indexVideoStatus() {
    const exists = await this.videoStatus.indexExists(['name_1'])
    if (!exists) {
      this.videoStatus.createIndex({ name: 1 })
    }
  }

  async indexFollowers() {
    const exists = await this.followers.indexExists(['user_id_1_followed_user_id_1'])
    if (!exists) {
      this.followers.createIndex({ user_id: 1, followed_user_id: 1 })
    }
  }

  async indexTweets() {
    const exists = await this.tweets.indexExists(['content_text'])
    if (!exists) {
      // Cho phép tìm các từ "Stop Word" như who, the, is, and...
      this.tweets.createIndex({ content: 'text' }, { default_language: 'none' })
    }
  }

  async indexBookmark() {
    const exists = await this.bookmarks.indexExists(['user_id_1_tweet_id_1'])
    if (!exists) {
      this.bookmarks.createIndex({ user_id: 1, tweet_id: 1 })
    }
  }

  async indexLikes() {
    const exists = await this.likes.indexExists(['tweet_id_1_user_id_1'])
    if (!exists) {
      this.likes.createIndex({ user_id: 1, tweet_id: 1 })
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

  // Collection bookmark
  get bookmarks(): Collection<Bookmark> {
    return this.db.collection(envConfig.dbBookmarksCollection)
  }

  // Collection like
  get likes(): Collection<Like> {
    return this.db.collection(envConfig.dbLikesCollection)
  }

  // Collection conversations
  get conversations(): Collection<Conversation> {
    return this.db.collection(envConfig.dbConversationCollection)
  }
}

const databaseService = new DatabaseService()
export default databaseService
