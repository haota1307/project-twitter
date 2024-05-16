import config from 'src/constants/config'
import http from 'src/utils/http'

const conversationApi = {
  getListConversation() {
    return http.get(`/conversations/list`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`
      },
      baseURL: config.baseUrl
    })
  }
}

export default conversationApi
