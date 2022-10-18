import express from 'express'
const infoRouter = express.Router()
import * as infoControllers from '../controllers/info.controllers.mjs'

// version info
infoRouter.get('/version', infoControllers.version)
infoRouter.get('/software', infoControllers.software)
infoRouter.get('/hardware', infoControllers.hardware)
infoRouter.get('/status', infoControllers.status)

export default infoRouter
