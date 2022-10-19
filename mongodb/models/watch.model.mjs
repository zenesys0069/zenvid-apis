import mongoose from 'mongoose'
import schemas from '../schemas/index.mjs'

const Watch = mongoose.model('watch', schemas.watch)

export default Watch
