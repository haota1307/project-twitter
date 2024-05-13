export enum TweetType {
  Tweet,
  Retweet,
  Comment,
  QuoteTweet
}

export enum TweetAudience {
  Everyone, // 0
  TwitterCircle // 1
}

export interface Media {
  url: string
  type: MediaType
}

export enum MediaType {
  Image,
  Video
}

export interface TweetBody {
  type: TweetType
  audience: TweetAudience
  content: string
  parent_id: null | string
  hashtags: string[]
  mentions: string[]
  medias: Media[]
}

export interface Tweet {
  id: any
  user: any
  user_id: string
  _id?: string
  type: TweetType
  audience: TweetAudience
  content: string
  parent_id: null | string //  chỉ null khi tweet gốc
  hashtags: string[]
  mentions: string[]
  comment?: string[]
  likes?: string[]
  bookmarks?: string[]
  medias: Media[]
  users: any
  user_views: number
  created_at: string
  updated_at: string
}
