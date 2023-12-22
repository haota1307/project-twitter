import { Request } from 'express'
import path from 'path'
import sharp from 'sharp'
import { UPLOAD_IMAGE_DIR } from '~/constants/dir'
import { Media } from '~/models/Other'
import { getNameFromFullName, handleUploadImage } from '~/utils/file'
import { uploadFileToS3 } from '~/utils/s3'
import mime from 'mime'
import fsPromise from 'fs/promises'
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
          fsPromise.unlink(newPath) // Xóa file trong /temp sau khi upload s3 AWS
        ])
        return {
          url: (s3Result as CompleteMultipartUploadCommandOutput).Location as string,
          type: MediaType.Image
        }
      })
    )
    return result
  }
}

const mediasService = new MediasService()

export default mediasService
