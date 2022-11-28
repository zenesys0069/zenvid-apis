import express from 'express'
import { isAuthenticated } from '../../../utils/jwt.mjs'
import validators from '../../../validators/index.mjs'
import * as controller from '../controllers/follow.controller.mjs'

const followRouter = express.Router()
/**
 * @swagger
 * /api/v1/follow/start:
 *   post:
 *     tags:
 *       - Follow and Following
 *     consumes: application/json
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: body
 *         name: body
 *         properties:
 *           username:
 *               username: string
 *     responses:
 *       200:
 *         description: User follow starting
 *       400:
 *         description: Bad Request please check your username
 *       500:
 *         description: Internal Server Error
 */
followRouter.post(
  '/start',
  isAuthenticated,
  validators.follow.username,
  validators.isRequestValidated,
  controller.start
)
/**
 * @swagger
 * /api/v1/follow/stop:
 *   post:
 *     tags:
 *       - Follow and Following
 *     consumes: application/json
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: body
 *         name: body
 *         properties:
 *           username:
 *               username: string
 *     responses:
 *       200:
 *         description: User unfollow successfully
 *       400:
 *         description: Bad Request please enter your correct username
 *       500:
 *         description: Internal Server Error
 */
followRouter.post(
  '/stop',
  isAuthenticated,
  validators.follow.username,
  validators.isRequestValidated,
  controller.stop
)
/**
 * @swagger
 * /api/v1/follow/followers:
 *   get:
 *     tags:
 *        - Follow and Following
 *     security:
 *        - bearerAuth: []
 *     responses:
 *         200:
 *              description: your all followers user.
 *         400:
 *              description: Bad Request please check authentication.
 *         500:
 *              description: Internal Server Error.
 */
followRouter.get('/followers', isAuthenticated, controller.followers)
/**
 * @swagger
 * /api/v1/follow/followings:
 *   get:
 *     tags:
 *        - Follow and Following
 *     security:
 *        - bearerAuth: []
 *     responses:
 *         200:
 *              description: your all following user.
 *         400:
 *              description: Bad Request please check authentication.
 *         500:
 *              description: Internal Server Error.
 */
followRouter.get('/followings', isAuthenticated, controller.followings)

export default followRouter
