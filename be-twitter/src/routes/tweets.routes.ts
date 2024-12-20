import { Router } from 'express'
import {
  createTweetController,
  deleteTweetController,
  getHomeFeedsController,
  getNewFeedsController,
  getTweetChildrenController,
  getTweetController,
  getTweetOfUserController,
  updateTweetController
} from '~/controllers/tweets.controller'
import { filterMiddlewares } from '~/middlewares/common.middlewares'
import {
  audiencevalidator,
  createTweetValidate,
  getTweetChildrenValidator,
  paginationValidator,
  tweetIdValidator
} from '~/middlewares/tweets.middlewares'
import { accessTokenValidator, isUserLoggedInValidator, verifiedUserValidator } from '~/middlewares/users.middlewares'
import { UpdateTweetRequestBody } from '~/models/requests/Tweet.requests'
import { wrapRequestHandler } from '~/utils/handlers'

const tweetsRouter = Router()

/**
 * Description: Get new feeds
 * Path: /
 * Method: GET
 * Query: {limit: number, page: number}
 */

tweetsRouter.get('/home-feed', paginationValidator, wrapRequestHandler(getHomeFeedsController))

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

/**
 * Description: Get tweet of user
 * Path: /:tweet_id
 * Method: GET
 * Header: {Authorization?: Bear <access_token>}
 */

tweetsRouter.get(
  '/list/:user_id',
  accessTokenValidator,
  paginationValidator,
  isUserLoggedInValidator(accessTokenValidator), // Cần trả về 1 validate
  isUserLoggedInValidator(verifiedUserValidator),
  wrapRequestHandler(getTweetOfUserController)
)

/**
 * Description: Get tweet children - pagination
 * Path: /:tweet_id/children
 * Method: GET
 * Header: {Authorization?: Bear <access_token>}
 * Query: {limit: number, page: number, tweet_type: TweetType}
 */

tweetsRouter.get(
  '/:tweet_id/children',
  tweetIdValidator,
  getTweetChildrenValidator,
  paginationValidator,
  isUserLoggedInValidator(accessTokenValidator), // Cần trả về 1 validate
  isUserLoggedInValidator(verifiedUserValidator),
  audiencevalidator,
  wrapRequestHandler(getTweetChildrenController)
)

/**
 * Description: Get new feeds
 * Path: /
 * Method: GET
 * Header: {Authorization?: Bear <access_token>}
 * Query: {limit: number, page: number}
 */

tweetsRouter.get(
  '/',
  paginationValidator,
  accessTokenValidator,
  verifiedUserValidator,
  wrapRequestHandler(getNewFeedsController)
)

/**
 * Description: delete tweet
 * Path: /
 * Method: DELETE
 * Header: {Authorization?: Bear <access_token>}
 */

tweetsRouter.delete(
  '/delete/:tweet_id',
  accessTokenValidator,
  verifiedUserValidator,
  tweetIdValidator,
  wrapRequestHandler(deleteTweetController)
)

/**
 * Description: update tweet
 * Path: /
 * Method: DELETE
 * Header: {Authorization?: Bear <access_token>}
 */

tweetsRouter.patch(
  '/update/:tweet_id',
  accessTokenValidator,
  verifiedUserValidator,
  filterMiddlewares<UpdateTweetRequestBody>(['content', 'audience', 'hashtags']),
  wrapRequestHandler(updateTweetController)
)

export default tweetsRouter
