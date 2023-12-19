import { Request, Response, NextFunction } from 'express'
import { pick } from 'lodash'

type FilterKeys<T> = Array<keyof T> // Tạo ra một mảng có các item lấy ra từ T

export const filterMiddlewares =
  <T>(filterKeys: FilterKeys<T>) =>
  (req: Request, res: Response, next: NextFunction) => {
    req.body = pick(req.body, filterKeys)
    next()
  }
