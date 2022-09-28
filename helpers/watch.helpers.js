import path from 'path' // Used for manipulation with path
import fs from 'fs-extra'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const uploadPath = path.join(__dirname, '../watch/') // Register the upload path
fs.ensureDir(uploadPath) // Make sure that he upload path exits

export const upload = (req, res, next) => {
  req.pipe(req.busboy) // Pipe it trough busboy
  req.busboy.on('file', (fieldname, file, filename) => {
    // Create a write stream of the new file
    const fstream = fs.createWriteStream(
      path.join(uploadPath, filename.filename)
    )
    // Pipe it trough
    file.pipe(fstream)
    // On finish of the upload
    fstream.on('close', () => {
      console.log(`Upload of '${filename.filename}' finished`)
      next()
    })
  })
}
