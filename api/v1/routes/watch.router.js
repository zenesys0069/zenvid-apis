import express from 'express'
import { isAuthenticated } from '../../../utils/jwt.js'
import validators from '../../../validators/index.js'
import * as watchControllers from '../controllers/watch.controllers.js'

// user routes reference
const watchRouter = express.Router()

/**
 * validators.XX.XXXX, is responsible to check mandators request payload
 * validators.isRequestValidated, is responsible to check is all validation is passed or not
 *
 * powered by, express-validators
 */

videoRouter.post('/upload', watchControllers.upload)

export default watchRouter
