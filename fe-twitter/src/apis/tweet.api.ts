import config from 'src/constants/config'
import http from 'src/utils/http'
import { TweetBody } from 'src/types/tweet.type'

const tweetApi = {
  createTweet(body: TweetBody) {
    return http.post(
      '/tweets',
      { ...body },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        },
        baseURL: config.baseUrl
      }
    )
  },
  getTweetDetail(id: any) {
    return http.get(`tweets/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('access_token')}`
      },
      baseURL: config.baseUrl
    })
  }
}
export default tweetApi
