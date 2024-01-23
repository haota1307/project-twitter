import http from 'src/utils/http'

export const userApi = {
  uploadIMG(body: any) {
    return http.post('/medias/upload-image', body, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  }
}
