import { Request } from 'express'
import path from 'path'
import sharp from 'sharp'
import { UPLOAD_IMAGE_DIR, UPLOAD_VIDEO_DIR } from '~/constants/dir'
import { Media } from '~/models/Other'
import { getFiles, getNameFromFullName, handleUploadImage, handleUploadVideo } from '~/utils/file'
import { uploadFileToS3 } from '~/utils/s3'
import mime from 'mime'
import fsPromise from 'fs/promises'
import fs from 'fs'
import { CompleteMultipartUploadCommandOutput } from '@aws-sdk/client-s3'
import { EncodingStatus, MediaType } from '~/constants/enums'
import databaseService from './database.services'
import VideoStatus from '~/models/schemas/VideoStatus.schema'
import { encodeHLSWithMultipleVideoStreams } from '~/utils/video'
import { rimrafSync } from 'rimraf'
import { config } from 'dotenv'
import { envConfig, isProduction } from '~/constants/config'
config()

class Queue {
  items: string[]
  encoding: boolean
  constructor() {
    this.items = []
    this.encoding = false
  }
  // Thêm item vào hàng đợi
  async enqueue(item: string) {
    this.items.push(item)
    // VD: item /home/abc/xyz/123/456.mp3 ->> lấy 456(name)
    // /[\\/]/ sẽ split khi gặp / hoặc \
    const idName = getNameFromFullName(item.split(/[\\/]/).pop() as string) // =>> lấy được 456.mp3 =>> chuyền tiếp =>> 456
    await databaseService.videoStatus.insertOne(
      new VideoStatus({
        name: idName,
        status: EncodingStatus.Pending
      })
    )
    this.processEncode()
  }

  async processEncode() {
    if (this.encoding) return // Nếu encoding đang chạy sẽ không encode nữa
    // Nếu có item trong hàng đợi
    if (this.items.length > 0) {
      this.encoding = true
      const videoPath = this.items[0]
      // /[\\/]/ sẽ split khi gặp / hoặc \
      const idName = getNameFromFullName(videoPath.split(/[\\/]/).pop() as string) // =>> lấy được 456.mp3 =>> chuyền tiếp =>> 456
      console.log(idName)
      await databaseService.videoStatus.updateOne(
        { name: idName },
        {
          $set: {
            status: EncodingStatus.Processing
          },
          $currentDate: {
            updated_at: true
          }
        }
      )
      try {
        await encodeHLSWithMultipleVideoStreams(videoPath)
        this.items.shift() // Xoá phẩn tử đầu tiên(phần tử đã encode xong)
        // upload lên s3
        const files = getFiles(path.resolve(UPLOAD_VIDEO_DIR, idName))
        await Promise.all(
          files.map((filepath) => {
            const filename = 'videos-hls/' + filepath.replace(path.resolve(UPLOAD_VIDEO_DIR), '').replace(/\\/g, '')
            return uploadFileToS3({
              filepath,
              filename,
              ContentType: mime.getType(filepath) as string
            })
          })
        )
        rimrafSync(path.resolve(UPLOAD_VIDEO_DIR, idName))
        await databaseService.videoStatus.updateOne(
          { name: idName },
          {
            $set: {
              status: EncodingStatus.Success
            },
            $currentDate: {
              updated_at: true
            }
          }
        )
        console.log(`Encode video ${videoPath} success`)
      } catch (error) {
        await databaseService.videoStatus
          .updateOne(
            { name: idName },
            {
              $set: {
                status: EncodingStatus.Failed
              },
              $currentDate: {
                updated_at: true
              }
            }
          )
          .catch((err) => {
            console.error('Update video status error', err)
          })
        console.error(`Encode video ${videoPath} error`)
        console.error(error)
      }
      this.encoding = false
      this.processEncode()
    } else {
      console.log('Encode video queue is empty')
    }
  }
}
const queue = new Queue()

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

        await Promise.all([
          fsPromise.unlink(file.filepath), // Xóa file trong /temp sau khi chuyển đổi
          fsPromise.rmdir(newPath) // Xóa file
        ])

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

  // Upload video HLS
  async uploadVideoHLS(req: Request) {
    const files = await handleUploadVideo(req)
    const result: Media[] = await Promise.all(
      files.map(async (file) => {
        const newName = getNameFromFullName(file.newFilename)
        queue.enqueue(file.filepath) // Đưa video vào hàng đợi chờ xử lý.
        return {
          url: isProduction
            ? `${envConfig.host}/static/video-hls/${newName}/master.m3u8`
            : `http://localhost:${envConfig.port}/static/video-hls/${newName}/master.m3u8`,
          type: MediaType.HLS
        }
      })
    )
    return result
  }

  // Get Status video
  async getVideoStatus(id: string) {
    const data = await databaseService.videoStatus.findOne({ name: id })
    return data
  }
}

const mediasService = new MediasService()

export default mediasService
