import { Request, Response } from 'express'
import { USERS_MESSAGES } from '~/constants/messages'
import mediasService from '~/services/medias.services'

export const uploadImageController = async (req: Request, res: Response) => {
  const url = await mediasService.uploadImage(req)
  return res.json({
    message: USERS_MESSAGES.UPLOAD_SUCCESS,
    result: url
  })
}

// Upload video streaming
export const uploadVideoController = async (req: Request, res: Response) => {
  const url = await mediasService.uploadVideo(req)
  return res.json({
    message: USERS_MESSAGES.UPLOAD_SUCCESS,
    result: url
  })
}

// Upload video HLS
export const uploadVideoHLSController = async (req: Request, res: Response) => {
  const url = await mediasService.uploadVideoHLS(req)
  return res.json({
    message: USERS_MESSAGES.UPLOAD_SUCCESS,
    result: url
  })
}

// Status video upload
export const videoStatusController = async (req: Request, res: Response) => {
  const { id } = req.params
  const result = await mediasService.getVideoStatus(id as string)
  return res.json({
    message: USERS_MESSAGES.GET_VIDEO_STATUS_SUCCESS,
    result: result
  })
}
