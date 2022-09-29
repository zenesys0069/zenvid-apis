import express from 'express'
import validators from '../../../validators/index.js'
import * as exploreControllers from '../controllers/explore.controllers.js'

// user routes reference
const exploreRouter = express.Router()

/**
 * validators.XX.XXXX, is responsible to check mandators request payload
 * validators.isRequestValidated, is responsible to check is all validation is passed or not
 *
 * powered by, express-validators
 */

exploreRouter.post(
  '/username',
  validators.explore.username,
  validators.isRequestValidated,
  exploreControllers.username
)

export default exploreRouter
