import express from 'express'
import middleware from '../../../middlewares/index.mjs'
import { isAuthenticated } from '../../../utils/jwt.mjs'
import validators from '../../../validators/index.mjs'
import * as userControllers from '../controllers/user.controllers.mjs'

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

userRouter.post(
  '/verify_otp',
  validators.user.verifyOtp,
  validators.isRequestValidated,
  userControllers.verifyOtp
)

// register the user
userRouter.post(
  '/register',
  validators.user.register,
  validators.isRequestValidated,
  middleware.user.uploadImage,
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
userRouter.put(
  '/profile/update/details',
  isAuthenticated,
  validators.user.updateProfileDetails,
  validators.isRequestValidated,
  middleware.user.uploadImage,
  userControllers.updateProfileDetails
)
userRouter.patch(
  '/profile/update/picture',
  isAuthenticated,
  validators.user.updatePicture,
  validators.isRequestValidated,
  middleware.user.uploadImage,
  userControllers.updatePicture
)

// reset password
userRouter.get(
  '/reset_password/:email',
  validators.user.resetPassword,
  validators.isRequestValidated,
  userControllers.resetPassword
)

userRouter.get('/videos', isAuthenticated, userControllers.videos)
userRouter.get('/videos/:page', isAuthenticated, userControllers.videos)

export default userRouter
