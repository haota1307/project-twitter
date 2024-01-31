import config from 'src/constants/config'
import http from 'src/utils/http'

const mediaApi = {
  uploadImg(body: FormData) {
    return http.post('/medias/upload-image', body, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${localStorage.getItem('access_token')}`
      },
      baseURL: config.baseUrl
    })
  },
  uploadVideo(body: FormData) {
    return http.post('/medias/upload-video', body, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${localStorage.getItem('access_token')}`
      },
      baseURL: config.baseUrl
    })
  }
}
export default mediaApi
