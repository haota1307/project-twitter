import config from 'src/constants/config'
import http from 'src/utils/http'

const interactApi = {
  bookmarkTweet(tweet_id: string) {
    return http.post(
      'bookmarks',
      {
        tweet_id
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        },
        baseURL: config.baseUrl
      }
    )
  },
  unbookmarkTweet(tweet_id: string) {
    return http.delete(`bookmarks/tweets/${tweet_id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`
      },
      baseURL: config.baseUrl
    })
  },
  unbookmarkTweetDeleted(bookmark_id: string) {
    return http.delete(`bookmarks/deleted/${bookmark_id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`
      },
      baseURL: config.baseUrl
    })
  },
  likeTweet(tweet_id: string) {
    return http.post(
      'likes',
      {
        tweet_id
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        },
        baseURL: config.baseUrl
      }
    )
  },
  unlikeTweet(tweet_id: string) {
    return http.delete(`likes/tweets/${tweet_id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`
      },
      baseURL: config.baseUrl
    })
  }
}

export default interactApi
