import { Request, Response } from 'express'
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
      users: result.users
    },
    message: 'Get list tweet successfull'
  })
}
