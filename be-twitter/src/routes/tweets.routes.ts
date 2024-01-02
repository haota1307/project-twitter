import { Router } from 'express'
import { createTweetController, getTweetController } from '~/controllers/tweets.controller'
import { audiencevalidator, createTweetValidate, tweetIdValidator } from '~/middlewares/tweets.middlewares'
import { accessTokenValidator, isUserLoggedInValidator, verifiedUserValidator } from '~/middlewares/users.middlewares'
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

/**
 * Description: Get tweet detail
 * Path: /:tweet_id
 * Method: GET
 * Header: {Authorization?: Bear <access_token>}
 */

tweetsRouter.get(
  '/:tweet_id',
  tweetIdValidator,
  isUserLoggedInValidator(accessTokenValidator), // Cần trả về 1 validate
  isUserLoggedInValidator(verifiedUserValidator),
  audiencevalidator,
  wrapRequestHandler(getTweetController)
)

export default tweetsRouter
