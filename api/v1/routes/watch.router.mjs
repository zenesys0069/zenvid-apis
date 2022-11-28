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

/**
 * @swagger
 * /api/v1/watch/upload:
 *   post:
 *     tags:
 *       - Watch
 *     consumes: multipart/form-data
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: formData
 *         name: uploadFile
 *         type: file
 *         required: true
 *       - in: formData
 *         name: title
 *         type: string
 *         required: true
 *       - in: formData
 *         name: description
 *         type: string
 *         required: true
 *     responses:
 *       200:
 *         description: Videos Upload Successfully.
 *       400:
 *         description: Bad Request title and description is missing.
 *       500:
 *         description: Internal Server Error
 */
watchRouter.post(
  '/upload',
  isAuthenticated,
  middleware.watch.uploadVideo,
  watchControllers.upload
)
/**
 * @swagger
 * /api/v1/watch/videos:
 *  get:
 *      tags:
 *         - Watch
 *      consumes: application/json
 *      security:
 *         - bearerAuth: []
 *      responses:
 *        200:
 *            description: All User Videos.
 *        404:
 *            description: Bad Request.
 *        500:
 *            description: Internal Server Error
 *
 */
watchRouter.get('/videos', watchControllers.getVideos)

watchRouter.get('/videos/:page', watchControllers.getVideos) //videos pagination.
/**
 * @swagger
 * /api/v1/watch/video/like:
 *   post:
 *     tags:
 *       - Watch
 *     consumes: application/json
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: body
 *         name: body
 *         properties:
 *           video_id:
 *               type: string
 *     responses:
 *       200:
 *         description: Videos like successfully.
 *       400:
 *         description: Bad Request Videos is not find.
 *       500:
 *         description: Internal Server Error
 */
watchRouter.post(
  '/video/like',
  isAuthenticated,
  validators.explore.like,
  validators.isRequestValidated,
  watchControllers.like
)
/**
 * @swagger
 * /api/v1/watch/video/comment:
 *   post:
 *     tags:
 *       - Watch
 *     consumes: application/json
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: body
 *         name: body
 *         properties:
 *           video_id:
 *               type: string
 *           comment:
 *               type: string
 *     responses:
 *       200:
 *         description: Videos comment Successfully.
 *       400:
 *         description: Bad Request videos not fond
 *       500:
 *         description: Internal Server Error
 */
watchRouter.post(
  '/video/comment/',
  isAuthenticated,
  validators.explore.postComment,
  validators.isRequestValidated,
  watchControllers.postComment
)
/**
 * @swagger
 * /api/v1/watch/video/get_comments:
 *   post:
 *      tags:
 *        - Watch
 *      consumes: application/json
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: body
 *          name: body
 *          properties:
 *              video_id:
 *                  type: string
 *                  required: true
 *      responses:
 *         200:
 *            description: Successfully
 *         400:
 *            description: Bad Request
 *         500:
 *            description: Internal Server Error
 *
 */
watchRouter.post(
  '/video/get_comments',
  isAuthenticated,
  validators.explore.getComment,
  validators.isRequestValidated,
  watchControllers.getComment
)

export default watchRouter
