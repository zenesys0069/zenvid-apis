import express from 'express'
import * as followController from '../controllers/follow.controller.mjs'

const followRouter = express.Router()

followRouter.post('/start', followController.start)
followRouter.post('/stop', followController.stop)

export default followRouter
