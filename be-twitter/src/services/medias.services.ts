import { Request } from 'express'
import path from 'path'
import sharp from 'sharp'
import { UPLOAD_IMAGE_DIR, UPLOAD_VIDEO_DIR } from '~/constants/dir'
import { Media } from '~/models/Other'
import { getNameFromFullName, handleUploadImage, handleUploadVideo } from '~/utils/file'
import { uploadFileToS3 } from '~/utils/s3'
import mime from 'mime'
import fsPromise from 'fs/promises'
import fs from 'fs'
import { CompleteMultipartUploadCommandOutput } from '@aws-sdk/client-s3'
import { MediaType } from '~/constants/enums'

class MediasService {
  async uploadImage(req: Request) {
    const files = await handleUploadImage(req)
    const result: Media[] = await Promise.all(
      files.map(async (file) => {
        const newName = getNameFromFullName(file.newFilename) // Lấy ra tên
        const newFullFileName = `${newName}.jpg`
        const newPath = path.resolve(UPLOAD_IMAGE_DIR, newFullFileName) // Lấy ra đường dẫn
        await sharp(file.filepath).jpeg().toFile(newPath) // Chuyển định dạng file ảnh sang jpeg
        // Upload lên s3 AWS
        const s3Result = await uploadFileToS3({
          filename: 'images/' + newFullFileName,
          filepath: newPath,
          ContentType: mime.getType(newPath) as string
        })
        await Promise.all([
          fsPromise.unlink(file.filepath), // Xóa file trong /temp sau khi chuyển đổi
          fsPromise.unlink(newPath) // Xóa file
        ])
        return {
          url: (s3Result as CompleteMultipartUploadCommandOutput).Location as string,
          type: MediaType.Image
        }
      })
    )
    return result
  }

  // Upload video
  async uploadVideo(req: Request) {
    const files = await handleUploadVideo(req)
    const result: Media[] = await Promise.all(
      files.map(async (file) => {
        const newName = getNameFromFullName(file.newFilename)
        const newPath = path.resolve(UPLOAD_VIDEO_DIR, newName)
        const s3Result = await uploadFileToS3({
          filename: 'videos/' + file.newFilename,
          filepath: file.filepath,
          ContentType: mime.getType(file.filepath) as string
        })

        fsPromise.unlink(file.filepath) // Xóa file trong /temp sau khi chuyển đổi
        fsPromise.rmdir(newPath) // Xóa folder sau khi up lên s3

        return {
          url: (s3Result as CompleteMultipartUploadCommandOutput).Location as string,
          type: MediaType.Video
        }
        // return {
        //   url: isProduction
        //     ? `${envConfig.host}/static/video-stream/${file.newFilename}`
        //     : `http://localhost:${envConfig.port}/static/video-stream/${file.newFilename}`,
        //   type: MediaType.Video
        // }
      })
    )
    return result
  }
}

const mediasService = new MediasService()

export default mediasService
