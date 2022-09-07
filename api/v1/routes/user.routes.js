import express from 'express'
import { isAuthenticated } from '../../../utils/jwt.js'
import * as userControllers from '../controllers/user.controllers.js'

const userRouter = express.Router()

userRouter.post('/register', userControllers.register)
userRouter.post('/login', userControllers.login)
userRouter.get('/profile', isAuthenticated, userControllers.profile)

export default userRouter
