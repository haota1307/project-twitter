import { Router } from 'express'
import { likeTweetController, unlikeTweetController } from '~/controllers/likes.controller'
import { tweetIdValidator } from '~/middlewares/tweets.middlewares'
import { accessTokenValidator, verifiedUserValidator } from '~/middlewares/users.middlewares'
import { wrapRequestHandler } from '~/utils/handlers'

const likeRouter = Router()

/**
 * Description: Like tweet
 * Path: /
 * Method: POST
 * Body: { tweet_id: string }
 * Header: {Authorization: Bear <access_token>}
 */
likeRouter.post(
  '/',
  accessTokenValidator,
  verifiedUserValidator,
  tweetIdValidator,
  wrapRequestHandler(likeTweetController)
)

/**
 * Description: Unlike tweet
 * Path: /tweets/:tweet_id
 * Method: DELETE
 * Header: {Authorization: Bear <access_token>}
 */
likeRouter.delete(
  '/tweets/:tweet_id',
  accessTokenValidator,
  verifiedUserValidator,
  tweetIdValidator,
  wrapRequestHandler(unlikeTweetController)
)

export default likeRouter
