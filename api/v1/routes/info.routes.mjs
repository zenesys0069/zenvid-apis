import express from 'express'
const infoRouter = express.Router()
import * as infoControllers from '../controllers/info.controllers.mjs'

// version info
infoRouter.get('/version', infoControllers.version)
infoRouter.get('/software', infoControllers.version)
infoRouter.get('/hardware', infoControllers.version)
infoRouter.get('/status', infoControllers.version)

export default infoRouter
