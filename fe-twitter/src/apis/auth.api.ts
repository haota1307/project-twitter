import { AuthResponse } from 'src/types/auth.type'
import { getAccessTokenFromLs } from 'src/utils/auth'
import http from 'src/utils/http'

export const URL_LOGIN = 'users/login'
export const URL_REGISTER = 'users/register'
export const URL_LOGOUT = 'users/logout'
export const URL_REFRESH_TOKEN = 'refresh-access-token'
export const URL_GET_PROFILE = 'users/profile'

const controller = new AbortController()

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
  logout(body: { refresh_token: string }) {
    return http.post<AuthResponse>(URL_LOGOUT, body, {
      headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` },
      signal: controller.signal
    })
  }
}

export default authApi
