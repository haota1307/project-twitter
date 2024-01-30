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

export interface Tweet {
  _id?: string
  user_id: string
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
  user_views: number
  created_at: string
  updated_at: string
}
