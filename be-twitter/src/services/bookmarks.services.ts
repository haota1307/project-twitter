import { ObjectId, WithId } from 'mongodb'
import databaseService from './database.services'
import { Bookmark } from '~/models/schemas/Bookmark.schema'
import { TweetType } from '~/constants/enums'

class BookmarkService {
  async bookmarkTweet(user_id: string, tweet_id: string) {
    const result = await databaseService.bookmarks.findOneAndUpdate(
      {
        user_id: new ObjectId(user_id),
        tweet_id: new ObjectId(tweet_id)
      },
      {
        $setOnInsert: new Bookmark({
          user_id: new ObjectId(user_id),
          tweet_id: new ObjectId(tweet_id)
        })
      },
      {
        upsert: true,
        returnDocument: 'after'
      }
    )
    return result as WithId<Bookmark>
  }

  async myBookmarkTweet({ user_id, limit, page }: { user_id: string; limit: number; page: number }) {
    const isMyBookmarks = await databaseService.bookmarks
      .aggregate([
        {
          $match: {
            user_id: new ObjectId(user_id)
          }
        },
        {
          $lookup: {
            from: 'tweets',
            localField: 'tweet_id',
            foreignField: '_id',
            as: 'tweet'
          }
        },
        {
          $lookup: {
            from: 'hashtags',
            localField: 'hashtags',
            foreignField: '_id',
            as: 'hashtags'
          }
        },
        {
          $lookup: {
            from: 'users',
            localField: 'mentions',
            foreignField: '_id',
            as: 'mentions'
          }
        },
        {
          $addFields: {
            mentions: {
              $map: {
                input: '$mentions',
                as: 'mention',
                in: {
                  _id: '$$mention._id',
                  name: '$$mention.name',
                  username: '$$mention.username',
                  email: '$$mention.email'
                }
              }
            }
          }
        },
        {
          $lookup: {
            from: 'bookmarks',
            localField: 'tweet_id',
            foreignField: 'tweet_id',
            as: 'bookmarks'
          }
        },
        {
          $lookup: {
            from: 'likes',
            localField: 'tweet_id',
            foreignField: 'tweet_id',
            as: 'likes'
          }
        },
        {
          $lookup: {
            from: 'tweets',
            localField: 'tweet_id',
            foreignField: 'parent_id',
            as: 'tweet_children'
          }
        },
        {
          $addFields: {
            tweet: {
              likes: {
                $map: {
                  input: '$likes',
                  as: 'like',
                  in: {
                    _id: '$$like.user_id'
                  }
                }
              },
              bookmarks: {
                $map: {
                  input: '$bookmarks',
                  as: 'bookmark',
                  in: {
                    _id: '$$bookmark.user_id'
                  }
                }
              },
              retweet: {
                $filter: {
                  input: '$tweet_children',
                  as: 'item',
                  cond: {
                    $eq: ['$$item.type', TweetType.Retweet]
                  }
                }
              },
              comment: {
                $filter: {
                  input: '$tweet_children',
                  as: 'item',
                  cond: {
                    $eq: ['$$item.type', TweetType.Comment]
                  }
                }
              },
              quote: {
                $filter: {
                  input: '$tweet_children',
                  as: 'item',
                  cond: {
                    $eq: ['$$item.type', TweetType.QuoteTweet]
                  }
                }
              }
            }
          }
        },
        {
          $lookup: {
            from: 'users',
            localField: 'tweet.user_id',
            foreignField: '_id',
            as: 'user'
          }
        },
        {
          $project: {
            tweet_children: 0,
            tweet_id: 0,
            user_id: 0,
            hashtags: 0,
            mentions: 0,
            bookmarks: 0,
            likes: 0,
            user: {
              password: 0,
              email_verify_token: 0,
              forgot_password_token: 0,
              twitter_circle: 0,
              date_of_bỉth: 0,
              bio: 0,
              date_of_birth: 0,
              created_at: 0,
              updated_at: 0,
              verify: 0,
              location: 0,
              website: 0,
              email: 0,
              cover_photo: 0
            }
          }
        },
        {
          $skip: limit * (page - 1) // Công thức phân trang
        },
        {
          $limit: limit
        }
      ])
      .toArray()

    const ids: ObjectId[] = isMyBookmarks.map((tweet) => tweet._id as ObjectId)
    const inc = user_id ? { user_views: 1 } : { guest_views: 1 }
    const date = new Date()
    // Không return nên phải dùng $set và chạy forEach đễ trả về giá trị
    const [, total] = await Promise.all([
      databaseService.tweets.updateMany(
        {
          _id: {
            $in: ids // tìm các id có trong mãng ids
          }
        },
        {
          $inc: inc,
          $set: {
            updated_at: date
          }
        }
      ),
      await databaseService.bookmarks.countDocuments({
        user_id_id: new ObjectId(user_id)
      })
    ])
    // return về dữ liệu đã được cập nhật
    isMyBookmarks.forEach((tweet) => {
      tweet.updated_at = date
      if (user_id) {
        tweet.user_views += 1
      } else {
        tweet.guest_views += 1
      }
    })

    return { isMyBookmarks, total }
  }

  async unbookmarkTweet(user_id: string, tweet_id: string) {
    const result = await databaseService.bookmarks.findOneAndDelete({
      user_id: new ObjectId(user_id),
      tweet_id: new ObjectId(tweet_id)
    })
    return result
  }
}

const bookmarkService = new BookmarkService()
export default bookmarkService
