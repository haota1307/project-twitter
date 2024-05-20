import { ObjectId } from 'mongodb'
import databaseService from './database.services'

class ConversationService {
  async getConversations({
    sender_id,
    receiver_id,
    limit,
    page
  }: {
    sender_id: string
    receiver_id: string
    limit: number
    page: number
  }) {
    const match = {
      $or: [
        { sender_id: new ObjectId(sender_id), receiver_id: new ObjectId(receiver_id) },
        { sender_id: new ObjectId(receiver_id), receiver_id: new ObjectId(sender_id) }
      ]
    }
    const conversations = await databaseService.conversations
      .find(match)
      .sort({ created_at: -1 })
      .skip(limit * (page - 1))
      .limit(limit)
      .toArray()
    const total = await databaseService.conversations.countDocuments(match)
    return { conversations, total }
  }

  async getListConversations(sender_id: string) {
    const listConversations = await databaseService.conversations
      .aggregate([
        {
          $match: {
            $or: [
              {
                sender_id: new ObjectId(sender_id)
              },
              {
                receiver_id: new ObjectId(sender_id)
              }
            ]
          }
        },
        {
          $sort: {
            created_at: -1
          }
        },
        {
          $group: {
            _id: {
              $cond: {
                if: {
                  $eq: ['$sender_id', new ObjectId(sender_id)]
                },
                then: '$receiver_id',
                else: '$sender_id'
              }
            },
            lastMessage: {
              $first: '$$ROOT'
            }
          }
        },
        {
          $lookup: {
            from: 'users',
            localField: '_id',
            foreignField: '_id',
            as: 'user'
          }
        },
        {
          $unwind: '$user'
        },
        {
          $project: {
            _id: 1,
            lastMessage: 1,
            user: {
              _id: 1,
              name: 1,
              username: 1,
              avatar: 1
            }
          }
        }
      ])
      .toArray()

    return listConversations
  }

  async deleteConversation(user_id: string, consersation_id: string) {
    const result = await Promise.all([
      databaseService.conversations.findOneAndDelete({
        sender_id: new ObjectId(user_id),
        _id: new ObjectId(consersation_id)
      })
    ])
    return result
  }
}

const conversationService = new ConversationService()
export default conversationService
