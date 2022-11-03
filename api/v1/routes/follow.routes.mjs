import express from 'express'
import { isAuthenticated } from '../../../utils/jwt.mjs'
import validators from '../../../validators/index.mjs'
import * as controller from '../controllers/follow.controller.mjs'

const followRouter = express.Router()

followRouter.post(
  '/start',
  isAuthenticated,
  validators.follow.username,
  validators.isRequestValidated,
  controller.start
)
followRouter.post(
  '/stop',
  isAuthenticated,
  validators.follow.username,
  validators.isRequestValidated,
  controller.stop
)

export default followRouter
