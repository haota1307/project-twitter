import config from 'src/constants/config'
import http from 'src/utils/http'

const searchApi = {
  searchTweet(content: string, limit: number, page: number, people_follow: number) {
    return http.get(`/search/tweet`, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${localStorage.getItem('access_token')}`
      },
      baseURL: config.baseUrl,
      params: {
        content,
        limit,
        page,
        people_follow
      }
    })
  }
}
export default searchApi
