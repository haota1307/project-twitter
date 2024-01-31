import config from 'src/constants/config'
import { AuthResponse } from 'src/types/auth.type'
import { getRefreshTokenFromLs } from 'src/utils/auth'
import http from 'src/utils/http'

export const URL_LOGIN = 'users/login'
export const URL_REGISTER = 'users/register'
export const URL_LOGOUT = 'users/logout'
export const URL_REFRESH_TOKEN = 'users/refresh-token'
export const URL_GET_PROFILE = 'users/profile'

const controller = new AbortController()

export const googleApi = {
  GOOGLE_CLIENT_ID: '748812675450-ouolfjf59ohvis3m4inkug0jn3rg7lmn.apps.googleusercontent.com',
  GOOGLE_REDIRECT_URI: 'http://localhost:4000/users/oauth/google'
}

const authApi = {
  // Đăng kí
  registerAccount(body: { email: string; password: string }) {
    return http.post<AuthResponse>(URL_REGISTER, body)
  },
  // Đăng Nhập
  login(body: { email: string; password: string }) {
    return http.post<AuthResponse>(URL_LOGIN, body)
  },
  // Đăng Xuất
  logout() {
    return http.post(
      '/users/logout',
      { refresh_token: getRefreshTokenFromLs() },
      {
        baseURL: config.baseUrl
      }
    )
  }
}

export default authApi
