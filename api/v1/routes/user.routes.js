import express from 'express'
import { isAuthenticated } from '../../../utils/jwt.js'
import validators from '../../../validators/index.js'
import * as userControllers from '../controllers/user.controllers.js'

// user routes reference
const userRouter = express.Router()

/**
 * validators.XX.XXXX, is responsible to check mandators request payload
 * validators.isRequestValidated, is responsible to check is all validation is passed or not
 *
 * powered by, express-validators
 */

// get otp
userRouter.post(
  '/get_otp',
  validators.user.otp,
  validators.isRequestValidated,
  userControllers.otp
)

// register the user
userRouter.post(
  '/register',
  validators.user.register,
  validators.isRequestValidated,
  userControllers.register
)

// login the user
userRouter.post(
  '/login',
  validators.user.login,
  validators.isRequestValidated,
  userControllers.login
)
// get user profile information
userRouter.get('/profile', isAuthenticated, userControllers.profile)

export default userRouter
