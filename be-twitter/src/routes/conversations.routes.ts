import { Router } from 'express'
import {
  deleteConversationController,
  getConversationsController,
  getListConversationsController
} from '~/controllers/conversation.controller'
import { paginationValidator } from '~/middlewares/tweets.middlewares'
import { accessTokenValidator, getConversationsValidator, verifiedUserValidator } from '~/middlewares/users.middlewares'
import { wrapRequestHandler } from '~/utils/handlers'

const conversationsRouter = Router()

conversationsRouter.get(
  '/receivers/:receiver_id',
  accessTokenValidator,
  verifiedUserValidator,
  paginationValidator,
  getConversationsValidator,
  wrapRequestHandler(getConversationsController)
)

conversationsRouter.get(
  '/list',
  accessTokenValidator,
  verifiedUserValidator,
  wrapRequestHandler(getListConversationsController)
)

conversationsRouter.delete(
  '/delete/:conversation_id',
  accessTokenValidator,
  verifiedUserValidator,
  wrapRequestHandler(deleteConversationController)
)

export default conversationsRouter
