import { Request, Response } from 'express'
import { TokenPayload } from '~/models/requests/User.requests'
import adminService from '~/services/admin.services'

export const adminUsersController = async (req: Request, res: Response) => {
  const limit = Number(req.query.limit)
  const page = Number(req.query.page)
  const result = await adminService.getListUsers({
    limit,
    page
  })
  return res.json({
    result: {
      limit,
      page,
      total_page: Math.ceil(result.total / limit),
      users: result.users
    },
    message: 'Get list user successfull'
  })
}

export const adminTweetsController = async (req: Request, res: Response) => {
  const limit = Number(req.query.limit)
  const page = Number(req.query.page)
  const result = await adminService.getListTweets({
    limit,
    page
  })
  return res.json({
    result: {
      limit,
      page,
      total_page: Math.ceil(result.total / limit),
      users: result.tweets
    },
    message: 'Get list tweet successfull'
  })
}

export const statisticalController = async (req: Request, res: Response) => {
  try {
    const result = await adminService.statistical()

    return res.json({
      message: 'Get statistical success',
      result
    })
  } catch (error) {
    console.error('Error in statistical service:', error)
    throw new Error('Failed to retrieve statistical data')
  }
}

export const banUserController = async (req: Request, res: Response) => {
  const { userId } = req.params
  const { body } = req

  try {
    const user = await adminService.BanUsers(userId, body)

    return res.json({
      message: 'Ban user success',
      result: user
    })
  } catch (error) {
    console.error('Error banning user:', error)
    return res.status(500).json({ error: 'Failed to ban user' })
  }
}

export const unbannUser = async (req: Request, res: Response) => {
  const { user_id } = req.decoded_authorization as TokenPayload
  try {
    const user = await adminService.processBanEnd(user_id)

    return res.json({
      message: 'Unban user success',
      result: user
    })
  } catch (error) {
    console.error('Error banning user:', error)
    return res.status(500).json({ error: 'Failed to ban user' })
  }
}

export const unbannUserByAdmin = async (req: Request, res: Response) => {
  const { userId } = req.params
  try {
    const user = await adminService.processBanEnd(userId)

    return res.json({
      message: 'Unban user success',
      result: user
    })
  } catch (error) {
    console.error('Error banning user:', error)
    return res.status(500).json({ error: 'Failed to ban user' })
  }
}
export const getConversationSensitivesController = async (req: Request, res: Response) => {
  try {
    const limit = Number(req.query.limit)
    const page = Number(req.query.page)

    const result = await adminService.sensitiveWords({ limit, page })

    return res.json({
      message: 'Get sensitives conversation success',
      result
    })
  } catch (error) {
    console.error('Error in sensitives conversation:', error)
    // Nếu có lỗi, trả về lỗi và thông báo lỗi cho client
    return res.status(500).json({
      error: 'Failed to sensitives conversation'
    })
  }
}
