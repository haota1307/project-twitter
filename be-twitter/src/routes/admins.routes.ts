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
import { accessTokenValidator, verifiedAdminValidator } from '~/middlewares/users.middlewares'
import { wrapRequestHandler } from '~/utils/handlers'

const adminRouter = Router()

// Get list user
adminRouter.get(
  '/users',
  accessTokenValidator,
  verifiedAdminValidator,
  paginationValidator,
  wrapRequestHandler(adminUsersController)
)

//Get list tweet
adminRouter.get(
  '/tweets',
  accessTokenValidator,
  verifiedAdminValidator,
  paginationValidator,
  wrapRequestHandler(adminTweetsController)
)

adminRouter.get('/statistical', accessTokenValidator, verifiedAdminValidator, wrapRequestHandler(statisticalController))
adminRouter.get(
  '/conversation',
  accessTokenValidator,
  verifiedAdminValidator,
  wrapRequestHandler(getConversationSensitivesController)
)

//Ban user
adminRouter.patch(
  '/users/:userId/ban',
  accessTokenValidator,
  verifiedAdminValidator,
  wrapRequestHandler(banUserController)
)

// unban by user
adminRouter.post('/process-ban-end', accessTokenValidator, wrapRequestHandler(unbannUser))

// unban by admin
adminRouter.post(
  '/users/:userId/unban',
  accessTokenValidator,
  verifiedAdminValidator,
  wrapRequestHandler(unbannUserByAdmin)
)
export default adminRouter
