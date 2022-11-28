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
/**
 * @swagger
 * /api/v1/user/get_otp:
 *   post:
 *     tags:
 *       - Authentication
 *     consumes: application/json
 *     parameters:
 *       - in: body
 *         name: body
 *         properties:
 *           email:
 *               email: string
 *     responses:
 *       201:
 *         description: Otp send successfully
 *       400:
 *         description: Bad Request Please Enter the correct email
 *       500:
 *         description: Internal Server Error
 */
userRouter.post(
  '/get_otp',
  validators.user.otp,
  validators.isRequestValidated,
  userControllers.otp
)
// verify_otp
/**
 * @swagger
 * /api/v1/user/verify_otp:
 *   post:
 *     tags:
 *       - Authentication
 *     consumes: application/json
 *     parameters:
 *       - in: body
 *         name: body
 *         properties:
 *           email:
 *               email: string
 *           otp:
 *               otp: number
 *     responses:
 *       200:
 *         description: One time password has been verified!
 *       400:
 *         description: Bad Request One time password has been expired!
 *       500:
 *         description: Internal Server Error
 */
userRouter.post(
  '/verify_otp',
  validators.user.verifyOtp,
  validators.isRequestValidated,
  userControllers.verifyOtp
)

// register the user
/**
 * @swagger
 * /api/v1/user/register:
 *   post:
 *     tags:
 *       - Authentication
 *     consumes: application/json
 *     parameters:
 *       - in: body
 *         name: body
 *         properties:
 *           firstName:
 *               type: string
 *           lastName:
 *               type: string
 *           phone:
 *               type: number
 *           username:
 *               type: string
 *           password:
 *               type: string
 *           email:
 *               type: string
 *           discription:
 *               type: string
 *     responses:
 *       200:
 *         description: login successfully
 *       400:
 *         description: Bad Request please check your input parameters
 *       500:
 *         description: Internal Server Error This email is already register
 */
userRouter.post(
  '/register',
  validators.user.register,
  validators.isRequestValidated,
  middleware.user.uploadImage,
  userControllers.register
)

// login the user
/**
 * @swagger
 * /api/v1/user/login:
 *   post:
 *     tags:
 *       - Authentication
 *     consumes: application/json
 *     parameters:
 *       - in: body
 *         name: body
 *         properties:
 *           email:
 *               email: string
 *           password:
 *               type: string
 *     responses:
 *       200:
 *         description: login successfully
 *       400:
 *         description: Bad Request Please enter the correct email and password
 *       500:
 *         description: Internal Server Error
 */
userRouter.post(
  '/login',
  validators.user.login,
  validators.isRequestValidated,
  userControllers.login
)
// get user profile information
/**
 * @swagger
 * /api/v1/user/profile:
 *  get:
 *      tags:
 *         - User Profile
 *      consumes: application/json
 *      security:
 *         - bearerAuth: []
 *      responses:
 *        200:
 *            description: user profile all details
 *        404:
 *            description: Bad Request Please check the token authentication
 *        500:
 *            description: Internal Server Error
 *
 */
userRouter.get('/profile', isAuthenticated, userControllers.profile)
/**
 * @swagger
 * /api/v1/user/profile/update/details:
 *   put:
 *     tags:
 *        - User Profile
 *     consumes: application/json
 *     description: Note:- Send the image only base64 formate.
 *     security:
 *         - bearerAuth: []
 *     parameters:
 *         - in: body
 *           name: body
 *           properties:
 *            firstName:
 *              type: string
 *            lastName:
 *              type: string
 *            phone:
 *              type: number
 *            description:
 *              type: string
 *            picture:
 *              type: string
 *     responses:
 *        200:
 *            description: User successfully profile detail
 *        400:
 *            description: Bad Request
 *        500:
 *            description: Internal server error
 */
userRouter.put(
  '/profile/update/details',
  isAuthenticated,
  validators.user.updateProfileDetails,
  validators.isRequestValidated,
  middleware.user.uploadImage,
  userControllers.updateProfileDetails
)
// user profile picture update
/**
 * @swagger
 * /api/v1/user/profile/update/picture:
 *   patch:
 *      tags:
 *          - User Profile
 *      consumes: application/json
 *      security:
 *          - bearerAuth: []
 *      parameters:
 *          - in: body
 *            name: body
 *            properties:
 *              picture:
 *                  type: string
 *      responses:
 *          200:
 *              description: Profile picture updated Successfully.
 *          400:
 *              description: Bad Request please check the image base64 and authentication
 *          500:
 *              description: Internal Server Error
 */
userRouter.patch(
  '/profile/update/picture',
  isAuthenticated,
  validators.user.updatePicture,
  validators.isRequestValidated,
  middleware.user.uploadImage,
  userControllers.updatePicture
)

// reset password
/**
 * @swagger
 * /api/v1/user/reset_password/{email}:
 *  get:
 *      tags:
 *         - User Profile
 *      consumes: application/json
 *      parameters:
 *         - in: path
 *           name: email
 *           type: string
 *           required: true
 *      responses:
 *        200:
 *            description: Reset password Successfully.
 *        401:
 *            description: Bad Request Please check the token authentication.
 *        500:
 *            description: Internal Server Error.
 */
userRouter.get(
  '/reset_password/:email',
  validators.user.resetPassword,
  validators.isRequestValidated,
  userControllers.resetPassword
)
// all user get videos
/**
 * @swagger
 *  /api/v1/user/videos:
 *    get:
 *      tags:
 *          - User Profile
 *      consumes: application/json
 *      security:
 *          - bearerAuth: []
 *      responses:
 *          200:
 *              description: Successfully user get the all videos.
 *          401:
 *              description: Bad Request please check the authentication.
 *          500:
 *              description: Internal Server Error
 */
userRouter.get('/videos', isAuthenticated, userControllers.videos)
userRouter.get('/videos/:page', isAuthenticated, userControllers.videos) // Get videos pagination
export default userRouter
