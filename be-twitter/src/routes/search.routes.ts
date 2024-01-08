import { Router } from 'express'
import { searchTweetController } from '~/controllers/search.controller'
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

export default searchRouter
