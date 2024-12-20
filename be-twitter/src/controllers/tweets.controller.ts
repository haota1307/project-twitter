import { Request, Response } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import { TweetType } from '~/constants/enums'
import { TWEETS_MESSAGES } from '~/constants/messages'
import { Pagination, TweetParam, TweetQuery, TweetRequestBody } from '~/models/requests/Tweet.requests'
import { TokenPayload } from '~/models/requests/User.requests'
import tweetsService from '~/services/tweets.services'

export const createTweetController = async (req: Request<ParamsDictionary, any, TweetRequestBody>, res: Response) => {
  const { user_id } = req.decoded_authorization as TokenPayload
  const result = await tweetsService.createTweet(user_id, req.body)
  return res.json({
    message: 'Create Tweet Successfully',
    result
  })
}

export const getTweetController = async (req: Request, res: Response) => {
  const result = await tweetsService.increaseView(req.params.tweet_id, req.decoded_authorization?.user_id)
  const users = await tweetsService.getUserWithTweetId(req.params.tweet_id)
  const tweet = {
    ...req.tweet,
    user: users[0]?.user,
    guest_views: result.guest_views,
    user_views: result.user_views,
    updated_at: result.updated_at
  }
  return res.json({
    message: TWEETS_MESSAGES.GET_TWEET_SUCCESSFULLY,
    result: tweet
  })
}

export const getTweetChildrenController = async (req: Request<TweetParam, any, any, TweetQuery>, res: Response) => {
  const tweet_type = Number(req.query.tweet_type) as TweetType
  const limit = Number(req.query.limit)
  const page = Number(req.query.page)
  const user_id = req.decoded_authorization?.user_id
  const { total, tweets } = await tweetsService.getTweetChildren({
    tweet_id: req.params.tweet_id,
    tweet_type,
    limit,
    page,
    user_id
  })
  return res.json({
    message: TWEETS_MESSAGES.GET_TWEET_CHILDREN_SUCCESSFULLY,
    result: {
      tweets,
      tweet_type,
      limit,
      page,
      total_page: Math.ceil(total / limit) // Tổng trang
    }
  })
}

export const getTweetOfUserController = async (req: Request<ParamsDictionary, any, any, Pagination>, res: Response) => {
  const { user_id } = req.params
  const limit = Number(req.query.limit)
  const page = Number(req.query.page)
  const result = await tweetsService.getTweetOfUser({
    user_id,
    limit,
    page
  })

  return res.json({
    message: TWEETS_MESSAGES.GET_NEW_FEEDS_SUCCESSFULLY,
    result: {
      tweets: result.tweets,
      limit,
      page,
      total_page: Math.ceil(result.total / limit)
    }
  })
}

export const getNewFeedsController = async (req: Request<ParamsDictionary, any, any, Pagination>, res: Response) => {
  const user_id = req.decoded_authorization?.user_id as string
  const limit = Number(req.query.limit)
  const page = Number(req.query.page)
  const result = await tweetsService.getNewFeeds({
    user_id,
    limit,
    page
  })

  return res.json({
    message: TWEETS_MESSAGES.GET_NEW_FEEDS_SUCCESSFULLY,
    result: {
      tweets: result.tweets,
      limit,
      page,
      total_page: Math.ceil(result.total / limit)
    }
  })
}

export const getHomeFeedsController = async (req: Request<ParamsDictionary, any, any, Pagination>, res: Response) => {
  const limit = Number(req.query.limit)
  const page = Number(req.query.page)
  const result = await tweetsService.getHomeFeeds({
    limit,
    page
  })

  return res.json({
    message: TWEETS_MESSAGES.GET_NEW_FEEDS_SUCCESSFULLY,
    result: {
      tweets: result.tweets,
      limit,
      page,
      total_page: Math.ceil(result.total / limit)
    }
  })
}

export const deleteTweetController = async (req: Request<ParamsDictionary, any, any, Pagination>, res: Response) => {
  const { user_id } = req.decoded_authorization as TokenPayload
  const result = await tweetsService.deleteTweet(user_id, req.params.tweet_id)
  return res.json({
    message: TWEETS_MESSAGES.DELETE_TWEET_SUCCESSFULLY,
    result
  })
}

export const updateTweetController = async (req: Request<ParamsDictionary, any, any>, res: Response) => {
  const { tweet_id } = req.params
  const { body } = req
  // Cập nhật
  const user = await tweetsService.updateTweet(tweet_id, body)
  return res.json({
    message: TWEETS_MESSAGES.UPDATE_TWEET_SUCCESS,
    result: user
  })
}
