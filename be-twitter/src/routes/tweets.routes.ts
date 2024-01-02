import { Router } from 'express'
import { createTweetController } from '~/controllers/tweets.controller'
import { createTweetValidate } from '~/middlewares/tweets.middlewares'
import { accessTokenValidator, verifiedUserValidator } from '~/middlewares/users.middlewares'
import { wrapRequestHandler } from '~/utils/handlers'

const tweetsRouter = Router()

/**
 * Description: create tweet
 * Path: /
 * Method: POST
 * Body: TweetRequestBody
 * Header: {Authorization: Bear <access_token>}
 */

tweetsRouter.post(
  '/',
  accessTokenValidator,
  verifiedUserValidator,
  createTweetValidate,
  wrapRequestHandler(createTweetController)
)

export default tweetsRouter
