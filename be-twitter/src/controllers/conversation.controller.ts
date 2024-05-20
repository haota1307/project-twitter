import { Request, Response } from 'express'
import { GetConversationsParams } from '~/models/requests/Conversation.requests'
import { TokenPayload } from '~/models/requests/User.requests'
import conversationService from '~/services/consersations.services'

export const getConversationsController = async (req: Request<GetConversationsParams>, res: Response) => {
  const { receiver_id } = req.params
  const limit = Number(req.query.limit)
  const page = Number(req.query.page)
  const sender_id = req.decoded_authorization?.user_id as string
  const result = await conversationService.getConversations({
    sender_id,
    receiver_id,
    limit,
    page
  })
  return res.json({
    result: {
      limit,
      page,
      total_page: Math.ceil(result.total / limit),
      conversations: result.conversations
    },
    message: 'Get conversations successfully'
  })
}

export const getListConversationsController = async (req: Request<GetConversationsParams>, res: Response) => {
  const sender_id = req.decoded_authorization?.user_id as string
  const result = await conversationService.getListConversations(sender_id)
  return res.json({
    message: 'Get list conversations successfully',
    result
  })
}

export const deleteConversationController = async (req: Request, res: Response) => {
  const { user_id } = req.decoded_authorization as TokenPayload
  const result = await conversationService.deleteConversation(user_id, req.params.conversation_id)
  return res.json({
    message: 'Delete conversation successfully',
    result
  })
}
