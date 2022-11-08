import mongoose from 'mongoose'
import schemas from '../schemas/index.mjs'

export const Watch = mongoose.model('watch', schemas.watch.watchSchema)
export const Comment = mongoose.model('comment', schemas.watch.commentsSchema)
