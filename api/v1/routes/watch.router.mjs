import express from 'express'
import helpers from '../../../helpers/index.mjs'
import { isAuthenticated } from '../../../utils/jwt.mjs'
import * as watchControllers from '../controllers/watch.controllers.mjs'

// user routes reference
const watchRouter = express.Router()

/**
 * validators.XX.XXXX, is responsible to check mandators request payload
 * validators.isRequestValidated, is responsible to check is all validation is passed or not
 *
 * powered by, express-validators
 */

watchRouter.get('/', (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' })
  res.write(
    '<form action="/api/v1/watch/upload" method="post" enctype="multipart/form-data">'
  )
  res.write('<input type="file" name="fileToUpload"><br>')
  res.write('<input type="submit">')
  res.write('</form>')
  return res.end()
})

watchRouter.post(
  '/upload',
  isAuthenticated,
  helpers.watch.upload,
  watchControllers.upload
)

export default watchRouter
