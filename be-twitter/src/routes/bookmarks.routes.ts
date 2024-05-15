import { Router } from 'express'
import {
  MyBookmarksController,
  bookmarkTweetController,
  unbookmarkTweetController,
  unbookmarkTweetDeletedController
} from '~/controllers/bookmarks.controller'
import { tweetIdValidator } from '~/middlewares/tweets.middlewares'
import { accessTokenValidator, verifiedUserValidator } from '~/middlewares/users.middlewares'
import { wrapRequestHandler } from '~/utils/handlers'

const bookmarksRouter = Router()

/**
 * Description: Bookmark tweet
 * Path: /
 * Method: POST
 * Body: { tweet_id: string }
 * Header: {Authorization: Bear <access_token>}
 */
bookmarksRouter.post(
  '/',
  accessTokenValidator,
  verifiedUserValidator,
  tweetIdValidator,
  wrapRequestHandler(bookmarkTweetController)
)

/**
 * Description: List bookmark tweet
 * Path: /
 * Method: POST
 * Body: { tweet_id: string }
 * Header: {Authorization: Bear <access_token>}
 */
bookmarksRouter.get(
  '/my-bookmarks',
  accessTokenValidator,
  verifiedUserValidator,
  wrapRequestHandler(MyBookmarksController)
)

/**
 * Description: Unbookmark tweet
 * Path: /tweets/:tweet_id
 * Method: DELETE
 * Body: { tweet_id: string }
 * Header: {Authorization: Bear <access_token>}
 */
bookmarksRouter.delete(
  '/tweets/:tweet_id',
  accessTokenValidator,
  verifiedUserValidator,
  tweetIdValidator,
  wrapRequestHandler(unbookmarkTweetController)
)

/**
 * Description: Unbookmark tweet deleted
 * Path: /tweets/:tweet_id
 * Method: DELETE
 * Body: { bookmark_id: string }
 * Header: {Authorization: Bear <access_token>}
 */
bookmarksRouter.delete(
  '/deleted/:bookmark_id',
  accessTokenValidator,
  verifiedUserValidator,
  wrapRequestHandler(unbookmarkTweetDeletedController)
)

export default bookmarksRouter
