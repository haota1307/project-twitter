import { Router } from 'express'
import { searchTweetController, searchUserController } from '~/controllers/search.controller'
import { searchValidator } from '~/middlewares/search.middlewares'
import { paginationValidator } from '~/middlewares/tweets.middlewares'
import { accessTokenValidator, verifiedUserValidator } from '~/middlewares/users.middlewares'
import { wrapRequestHandler } from '~/utils/handlers'

const searchRouter = Router()

searchRouter.get(
  '/tweet',
  accessTokenValidator,
  verifiedUserValidator,
  searchValidator,
  paginationValidator,
  wrapRequestHandler(searchTweetController)
)

searchRouter.get(
  '/user',
  accessTokenValidator,
  verifiedUserValidator,
  searchValidator,
  paginationValidator,
  wrapRequestHandler(searchUserController)
)

export default searchRouter
