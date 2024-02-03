import { Request, Response } from 'express'
import randomService from '~/services/randoms.services'

export const randomUserController = async (req: Request, res: Response) => {
  const { sizeList } = req.body
  const users = await randomService.randomUser(sizeList)
  return res.json({
    message: 'Get random users success',
    result: users
  })
}
