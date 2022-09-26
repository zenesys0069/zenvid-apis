import mongoose from 'mongoose'
import schemas from '../schemas/index.js'

const User = mongoose.model('User', schemas.user)

export default User
