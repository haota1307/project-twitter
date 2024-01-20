import { SuccessResponseApi } from './utils.type'

export type AuthResponse = SuccessResponseApi<{
  access_token: string
  refresh_token: string
  expires_refresh_token: number
  expires: number
}>

export type RefreshTokenReponse = SuccessResponseApi<{ access_token: string }>
