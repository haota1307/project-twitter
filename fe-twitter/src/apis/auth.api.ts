import config from 'src/constants/config'
import { AuthResponse } from 'src/types/auth.type'
import { getRefreshTokenFromLs } from 'src/utils/auth'
import http from 'src/utils/http'

export const URL_LOGIN = 'users/login'
export const URL_LOGIN_WITH_GOOGLE = 'users/oauth/google'
export const URL_REGISTER = 'users/register'
export const URL_LOGOUT = 'users/logout'
export const URL_REFRESH_TOKEN = 'users/refresh-token'

export const googleApi = {
  GOOGLE_CLIENT_ID: '748812675450-ouolfjf59ohvis3m4inkug0jn3rg7lmn.apps.googleusercontent.com',
  GOOGLE_REDIRECT_URI: 'http://localhost:4000/users/oauth/google'
}

const authApi = {
  // Đăng kí
  registerAccount(body: { email: string; password: string; name: string }) {
    return http.post<AuthResponse>(URL_REGISTER, body)
  },
  // Đăng Nhập
  login(body: { email: string; password: string }) {
    return http.post<AuthResponse>(URL_LOGIN, body)
  },
  // Đăng Xuất
  logout() {
    return http.post(
      URL_LOGOUT,
      { refresh_token: getRefreshTokenFromLs() },
      {
        baseURL: config.baseUrl
      }
    )
  }
}

export default authApi
