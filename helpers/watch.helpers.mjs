import path from 'path' // Used for manipulation with path
import fs from 'fs-extra'
import { fileURLToPath } from 'url'
import { dirname } from 'path'
import { nanoid } from 'nanoid'
import * as constants from '../constants/index.mjs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export const upload = (req, res, next) => {
  const uploadPath = path.join(__dirname, `../watch/${req.user.username}/`) // Register the upload path
  fs.ensureDir(uploadPath) // Make sure that he upload path exits
  req.busboy.on('text', (...rest) => console.log(rest))
  req.pipe(req.busboy) // Pipe it trough busboy

  req.busboy.on('file', (fieldname, file, filename) => {
    // Create a write stream of the new file
    let watchName = null
    try {
      watchName = `${nanoid()}_ms${Date.now()}.${
        filename.mimeType.split('/')[1]
      }`
    } catch (error) {
      console.log('h')
    }
    if (!watchName) {
      return res.status(400).json({
        status: false,
        message: 'There was an error, please try again',
      })
    }
    const fstream = fs.createWriteStream(path.join(uploadPath, watchName))
    // Pipe it trough
    file.pipe(fstream)
    // On finish of the upload
    req.busboy.on('field', (name, val, info) => {
      req.locales = {
        ...req.locales,
        [name]: val,
      }
    })
    fstream.on('close', () => {
      req.locales = {
        ...req.locales,
        watch: `${req.user.username}/${watchName}`,
      }
      next()
    })
  })
}

export const getWatchFullPath = (req, path) => {
  const protocol = req.protocol
  const host = req.get('host')
  if (!path) return null
  const fullPath = `${protocol}://${host}${constants.STATIC_WATCH}/${path}`
  return fullPath
}
