import config from 'src/constants/config'
import http from 'src/utils/http'

export const URL_GET_PROFILE = 'users/profile'

const userApi = {
  getProfile() {
    return http.get(URL_GET_PROFILE, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`
      },
      baseURL: config.baseUrl
    })
  },
  getUserProfile(user_id: string) {
    return http.get(`users/${user_id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`
      },
      baseURL: config.baseUrl
    })
  },
  updateUserProfile(data: any) {
    return http.patch(
      'users/profile',
      { ...data },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        },
        baseURL: config.baseUrl
      }
    )
  }
}
export default userApi
