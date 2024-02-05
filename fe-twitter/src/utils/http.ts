import axios, { AxiosError, HttpStatusCode, type AxiosInstance } from 'axios'
import { toast } from 'react-toastify'

import { AuthResponse, RefreshTokenReponse } from 'src/types/auth.type'
import { URL_LOGIN, URL_LOGOUT, URL_REFRESH_TOKEN, URL_REGISTER } from 'src/apis/auth.api'
import {
  clearLS,
  getAccessTokenFromLs,
  getProfileFromLS,
  getRefreshTokenFromLs,
  setAccessTokenToLS,
  setProfileToLS,
  setRefreshTokenToLS
} from './auth'
import config from 'src/constants/config'
import { isAxiosExpiredTokenError, isAxiosUnauthorizedError } from './utils'

const controller = new AbortController()

export class Http {
  instance: AxiosInstance
  private accessToken: string
  private refreshToken: string
  private profile: string
  private refreshTokenRequest: Promise<string> | null
  constructor() {
    this.accessToken = getAccessTokenFromLs()
    this.refreshToken = getRefreshTokenFromLs()
    this.profile = getProfileFromLS()
    this.refreshTokenRequest = null
    this.instance = axios.create({
      baseURL: config.baseUrl,
      headers: {
        'Content-Type': 'application/json',
        'expire-access-token': 60 * 60 * 24, //1 ngay
        'expire-refresh-token': 60 * 60 * 24 * 100 //100 ngay
      },
      signal: controller.signal
    })
    // Header token
    this.instance.interceptors.request.use(
      (config) => {
        if (this.accessToken && config.headers) {
          config.headers.authorization = 'Bearer ' + this.accessToken
          return config
        }
        return config
      },
      (error) => {
        return Promise.reject(error)
      }
    )
    // Xử lý lỗi trả về
    this.instance.interceptors.response.use(
      (response) => {
        const { url } = response.config
        if (url === URL_LOGIN || url === URL_REGISTER) {
          const data = response.data as AuthResponse
          this.accessToken = data.result.access_token
          this.refreshToken = data.result.refresh_token
          // Lưu access token & refresh token & profile đăng nhập
          setAccessTokenToLS(this.accessToken)
          setRefreshTokenToLS(this.refreshToken)
          setProfileToLS(data.result?.user)
        } else if (url === URL_LOGOUT) {
          // Xóa access token && refresh token khi đăng xuất
          this.accessToken = ''
          this.refreshToken = ''
          this.profile = ''
          clearLS()
        }
        return response
      },
      (error: AxiosError) => {
        // chỉ toast  lỗi != 422 & !== 401
        console.error('Response Error:', error)
        if (
          ![HttpStatusCode.UnprocessableEntity, HttpStatusCode.Unauthorized].includes(error.response?.status as number)
        ) {
          const data: any | undefined = error.response?.data
          const message = data.message || error.message
          toast.error(message)
        }
        // Lỗi Unauthorized (401)
        if (isAxiosUnauthorizedError(error)) {
          const config = error.response?.config || { headers: {}, url: '' }
          const { url } = config
          // TH: Token hết hạn & request đó không phải là của request refresh token => tiến hành gọi refresh token
          if (isAxiosExpiredTokenError(error) && url !== URL_REFRESH_TOKEN) {
            console.log('lỗi 401 rồi', error)
            // hạn chế gọi 2 lần handleRefreshToken
            this.refreshTokenRequest = this.refreshTokenRequest
              ? this.refreshTokenRequest
              : this.handleRefreshToken().finally(() => {
                  // Giữ refresh token trong 10s cho những request tiếp theo nếu có 401 thì dùng
                  setTimeout(() => {
                    this.refreshTokenRequest = null
                  }, 10000)
                })
            return this.refreshTokenRequest.then((access_token) => {
              // Nghĩa là chúng ta tiếp tục gọi lại request cũ vừa bị lỗi
              return this.instance({
                ...config,
                headers: { ...config.headers, authorization: access_token }
              })
            })
          }
          // clearLS()
          // this.accessToken = ''
          // this.refreshToken = ''
          // this.profile = ''
        }
        return Promise.reject(error)
      }
    )
  }
  // handle Refresh token
  private handleRefreshToken() {
    console.log('Refresh token')
    return this.instance
      .post<RefreshTokenReponse>(URL_REFRESH_TOKEN, {
        refresh_token: this.refreshToken
      })
      .then((res) => {
        const { access_token } = res.data.result
        setAccessTokenToLS(access_token)
        this.accessToken = access_token
        console.log(res)

        return access_token
      })
      .catch((error) => {
        clearLS()
        this.accessToken = ''
        this.refreshToken = ''
        this.profile = ''
        console.log(error)
        throw error
      })
  }
}

const http = new Http().instance

export default http
