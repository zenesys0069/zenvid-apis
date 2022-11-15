import express from 'express'
import middleware from '../../../middlewares/index.mjs'
import { isAuthenticated } from '../../../utils/jwt.mjs'
import * as watchControllers from '../controllers/watch.controllers.mjs'
import validators from '../../../validators/index.mjs'

// user routes reference
const watchRouter = express.Router()

/**
 * validators.XX.XXXX, is responsible to check mandators request payload
 * validators.isRequestValidated, is responsible to check is all validation is passed or not
 *
 * powered by, express-validators
 */
watchRouter.post(
  '/upload',
  isAuthenticated,
  middleware.watch.uploadVideo,
  watchControllers.upload
)
watchRouter.get('/videos', watchControllers.getVideos)

watchRouter.get('/videos/:page', watchControllers.getVideos)
watchRouter.post(
  '/video/like',
  isAuthenticated,
  validators.explore.like,
  validators.isRequestValidated,
  watchControllers.like
)

watchRouter.post(
  '/video/comment/',
  isAuthenticated,
  validators.explore.postComment,
  validators.isRequestValidated,
  watchControllers.postComment
)
watchRouter.post(
  '/video/comments',
  isAuthenticated,
  validators.explore.getComment,
  validators.isRequestValidated,
  watchControllers.getComment
)

export default watchRouter
