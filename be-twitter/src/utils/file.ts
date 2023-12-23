import { Request } from 'express'
import fs from 'fs'
import formidable, { File } from 'formidable'
import { UPLOAD_IMAGE_TEMP_DIR, UPLOAD_VIDEO_DIR, UPLOAD_VIDEO_TEMP_DIR } from '~/constants/dir'
import path from 'path'

export const initFolder = () => {
  ;[UPLOAD_IMAGE_TEMP_DIR, UPLOAD_VIDEO_TEMP_DIR].forEach((dir) => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, {
        recursive: true // Mục đích là tạo folder nested để upvideo
      })
    }
  })
}

// Lấy ra tên
export const getNameFromFullName = (fullName: string) => {
  const nameArr = fullName.split('.')
  nameArr.pop()
  return nameArr.join('')
}

// lấy đuôi mở trộng
export const getExtension = (fullName: string) => {
  const nameArr = fullName.split('.')
  return nameArr[nameArr.length - 1]
}

export const handleUploadImage = async (req: Request) => {
  const form = formidable({
    // Nơi lưu hình ảnh được upload
    uploadDir: UPLOAD_IMAGE_TEMP_DIR,
    // Số lượng file tối đa 1 lần upload (mặc định infynity)
    maxFiles: 4,
    // Lấy luôn đuôi mở rộng
    keepExtensions: true,
    // Size 300kb mỗi file
    maxFileSize: 300 * 1024,
    // Tổng size của tất cả các file, mặc định === maxFileSize
    maxTotalFileSize: 300 * 1024 * 4,
    // lọc chỉ cho up file là image
    filter: function ({ name, mimetype }) {
      const valid = name === 'image' && Boolean(mimetype?.includes('image/'))
      if (!valid) {
        console.log('handleUploadImage - valid: Error')
        form.emit('error' as any, new Error('file type is not valid') as any)
      }
      return valid
    }
  })
  // Trả về một Promise chứa danh sách các file được upload
  return new Promise<File[]>((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) {
        return reject(err)
      }
      // Kiểm tra xem có file ảnh được upload hay không
      // eslint-disable-next-line no-extra-boolean-cast
      if (!Boolean(files.image)) {
        console.log('files.image - files.image: Error')

        return reject(new Error('file is empty'))
      }
      // Nếu mọi thứ đều hợp lệ, resolve với danh sách các file ảnh được upload
      resolve(files.image as File[])
    })
  })
}

export const handleUploadVideo = async (req: Request) => {
  // fix esmodule được dùng trong commonjs, tsconfig "moduleResolution": "NodeNext",
  const formidable = (await import('formidable')).default
  const nanoId = (await import('nanoid')).nanoid
  const idName = nanoId()
  // Tạo folder
  const folderPath = path.resolve(UPLOAD_VIDEO_DIR, idName)
  fs.mkdirSync(folderPath)
  const form = formidable({
    // Nơi lưu những thứ được upload
    uploadDir: path.resolve(UPLOAD_VIDEO_DIR, idName),
    // Số lượng file 1 lần upload <<Mặc định: infinity>>
    maxFiles: 1,
    // Size 50mb mỗi file
    maxFileSize: 50 * 1024 * 1024,
    // Lọc chỉ cho up file mp4
    filter: function ({ name, originalFilename, mimetype }) {
      const valid = name === 'video' && Boolean(mimetype?.includes('mp4') || mimetype?.includes('quicktime'))
      if (!valid) {
        form.emit('error' as any, new Error('file type is not valid') as any)
      }
      return valid
    },
    filename: function () {
      return idName
    }
  })
  return new Promise<File[]>((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) {
        return reject(err)
      }
      // eslint-disable-next-line no-extra-boolean-cast
      if (!Boolean(files.video)) {
        return reject(new Error('file is empty'))
      }
      const videos = files.video as File[]
      // Thêm đuôi mở rộng file
      videos.forEach((video) => {
        const ext = getExtension(video.originalFilename as string)
        fs.renameSync(video.filepath, video.filepath + '.' + ext)
        video.newFilename = video.newFilename + '.' + ext
        video.filepath = video.filepath + '.' + ext
      })

      resolve(files.video as File[])
    })
  })
}
