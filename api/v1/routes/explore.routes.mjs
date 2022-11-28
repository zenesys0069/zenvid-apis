import express from 'express'
import validators from '../../../validators/index.mjs'
import * as exploreControllers from '../controllers/explore.controllers.mjs'

// user routes reference
const exploreRouter = express.Router()

/**
 * validators.XX.XXXX, is responsible to check mandators request payload
 * validators.isRequestValidated, is responsible to check is all validation is passed or not
 *
 * powered by, express-validators
 */

/**
 * @swagger
 * /api/v1/explore/username:
 *   post:
 *     tags:
 *       - Explore
 *     consumes: application/json
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: body
 *         name: body
 *         properties:
 *           username:
 *               type: string
 *     responses:
 *       200:
 *         description: Successfully Username is available!.
 *       400:
 *         description: Bad Request Username already user taken.
 *       500:
 *         description: Internal Server Error.
 */
exploreRouter.post(
  '/username',
  validators.explore.username,
  validators.isRequestValidated,
  exploreControllers.username
)
/**
 * @swagger
 * /api/v1/explore/find_user:
 *   post:
 *     tags:
 *       - Explore
 *     consumes: application/json
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: body
 *         name: body
 *         properties:
 *           search:
 *               type: string
 *     responses:
 *       200:
 *         description: Successfully user find
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Internal Server Error
 */
exploreRouter.post(
  '/find_user',
  validators.explore.findUser,
  validators.isRequestValidated,
  exploreControllers.findUser
)

export default exploreRouter
