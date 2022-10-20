import fs from 'fs'
import mime from 'mime'
import path from 'path'
import fse from 'fs-extra'
import { fileURLToPath } from 'url'
import { dirname } from 'path'
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const uploadPath = path.join(__dirname, `../avatars/`)
fse.ensureDir(uploadPath)
export const uploadImage = async (req, res, next) => {
  // to declare some path to store your converted image
  if (!req.body.picture) {
    res.locals.picture = {
      status: false,
      message: 'profile picture not provided',
    }
    return next()
  }

  try {
    var matches = req.body.picture.match(/^data:([A-Za-z-+/]+);base64,(.+)$/),
      response = {}

    if (matches.length !== 3) {
      return new Error('Invalid input string')
    }
    response.type = matches[1]
    response.data = new Buffer(matches[2], 'base64')
    let decodedImg = response
    let imageBuffer = decodedImg.data
    let type = decodedImg.type
    let extension = mime.getExtension(type)
    let fileName = req.user.username + '.' + extension
    fs.writeFileSync(uploadPath + fileName, imageBuffer, 'utf8')
    res.locals.picture = {
      status: true,
      message: 'profile uploaded successfully',
      path: fileName,
    }
    next()
  } catch (e) {
    res.status(400).json({
      status: false,
      message: 'Please provide a valid image base',
    })
  }
}
