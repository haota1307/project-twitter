import config from 'src/constants/config'
import http from 'src/utils/http'
import { Tweet, TweetBody } from 'src/types/tweet.type'

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
  getTweetDetail(id: string) {
    return http.get(`tweets/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('access_token')}`
      },
      baseURL: config.baseUrl
    })
  },
  editTweet(body: any) {
    return http.patch(
      `tweets/update/${body?.id}`,
      { ...body },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        },
        baseURL: config.baseUrl
      }
    )
  }
}
export default tweetApi
