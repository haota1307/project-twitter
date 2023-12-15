import { Request, Response, NextFunction, RequestHandler } from 'express'

// Hạn chế try catch khi xử lý =>> Khi một handle nào bị lỗi thì sẽ được next
export const wrapRequestHandler = <P>(func: RequestHandler<P, any, any, any>) => {
  return async (req: Request<P>, res: Response, next: NextFunction) => {
    try {
      await func(req, res, next)
    } catch (error) {
      next(error)
    }
  }
}

// usersRouter.get('/:username', wrapRequestHandler(getProfileController))
// Mong muốn nhận vào là Request<{ username: string }>
// Thực nhận là: Request<ParamsDictionary> <-> Request<{[key: string]: string}>
// => fix generic type
