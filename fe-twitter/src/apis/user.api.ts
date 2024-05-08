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
  },
  resetPassword(data: { password: string; confirm_password: string; forgot_password_token: string }) {
    return http.post('users/reset-password', data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`
      },
      baseURL: config.baseUrl
    })
  },
  changePassword(data: { password: string; confirm_password: string; old_password: string }) {
    return http.put('users/change-password', data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`
      },
      baseURL: config.baseUrl
    })
  },
  forgotPassword(data: { email: string }) {
    return http.post('/users/forgot-password', data, {
      baseURL: config.baseUrl
    })
  }
}
export default userApi
