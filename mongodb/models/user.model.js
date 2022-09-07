import mongoose from 'mongoose'
import schemas from '../schemas/index.js'

export const User = mongoose.model('User', schemas.user)
