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
