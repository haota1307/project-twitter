import { Router } from 'express'
import {
  adminTweetsController,
  adminUsersController,
  banUserController,
  getConversationSensitivesController,
  statisticalController,
  unbannUser,
  unbannUserByAdmin
} from '~/controllers/admin.controller'
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

adminRouter.get('/statistical', wrapRequestHandler(statisticalController))
adminRouter.get('/conversation', wrapRequestHandler(getConversationSensitivesController))

//Ban user
adminRouter.patch(
  '/users/:userId/ban',
  accessTokenValidator,
  verifiedUserValidator,
  wrapRequestHandler(banUserController)
)

// unban by user
adminRouter.post('/process-ban-end', accessTokenValidator, wrapRequestHandler(unbannUser))

// unban by admin
adminRouter.post('/users/:userId/unban', accessTokenValidator, wrapRequestHandler(unbannUserByAdmin))
export default adminRouter
