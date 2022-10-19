import express from 'express'
import helpers from '../../../helpers/index.mjs'
import { isAuthenticated } from '../../../utils/jwt.mjs'
import * as watchControllers from '../controllers/watch.controllers.mjs'

// user routes reference
const watchRouter = express.Router()

/**
 * validators.XX.XXXX, is responsible to check mandators request payload
 * validators.isRequestValidated, is responsible to check is all validation is passed or not
 *
 * powered by, express-validators
 */

watchRouter.get('/videos', watchControllers.getVideos)

watchRouter.post(
  '/upload',
  isAuthenticated,
  helpers.watch.upload,
  watchControllers.upload
)

export default watchRouter
