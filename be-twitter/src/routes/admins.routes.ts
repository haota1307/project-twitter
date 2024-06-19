import { Router } from 'express'
import { adminTweetsController, adminUsersController, banUserController } from '~/controllers/admin.controller'
import { paginationValidator } from '~/middlewares/tweets.middlewares'
import { accessTokenValidator, verifiedUserValidator } from '~/middlewares/users.middlewares'
import { wrapRequestHandler } from '~/utils/handlers'

const adminRouter = Router()

// Get list user
adminRouter.get(
  '/users',
  accessTokenValidator,
  verifiedUserValidator,
  paginationValidator,
  wrapRequestHandler(adminUsersController)
)

//Get list tweet
adminRouter.get(
  '/tweets',
  accessTokenValidator,
  verifiedUserValidator,
  paginationValidator,
  wrapRequestHandler(adminTweetsController)
)

//Ban user
adminRouter.patch(
  '/users/:userId/ban',
  accessTokenValidator,
  verifiedUserValidator,
  wrapRequestHandler(banUserController)
)
export default adminRouter
