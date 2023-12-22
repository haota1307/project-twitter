import { S3 } from '@aws-sdk/client-s3'
import { Upload } from '@aws-sdk/lib-storage'
import { envConfig } from '~/constants/config'
import fs from 'fs'
import HTTP_STATUS from '~/constants/httpStatus'
import { Response } from 'express'

const s3 = new S3({
  region: envConfig.awsRegion,
  credentials: {
    secretAccessKey: envConfig.awsSecretAccessKey as string,
    accessKeyId: envConfig.awsAccessKeyId as string
  }
})

export const uploadFileToS3 = ({
  filename,
  filepath,
  ContentType
}: {
  filename: string
  filepath: string
  ContentType: string
}) => {
  const paralleUploads3 = new Upload({
    client: s3,
    params: {
      Bucket: envConfig.s3BucketName as string,
      Key: filename,
      Body: fs.readFileSync(filepath),
      ContentType: ContentType
    },
    tags: [],
    queueSize: 4, // optional concurrency configuration
    partSize: 1024 * 1024 * 5, // optional size of each part, in bytes, at least 5MB
    leavePartsOnError: false // optional manually handle dropped parts
  })
  return paralleUploads3.done() // xác định upload thành công
}

// Trung gian để gửi file từ s3 về cho người dùng
export const sendFileFromS3 = async (res: Response, filepath: string) => {
  try {
    const data = await s3.getObject({
      Bucket: envConfig.s3BucketName as string,
      Key: filepath
    })
    ;(data.Body as any).pipe(res)
  } catch (error) {
    res.status(HTTP_STATUS.NOT_FOUND).send('Not found')
  }
}
