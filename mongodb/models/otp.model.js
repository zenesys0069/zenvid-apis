import mongoose from 'mongoose'
import schemas from '../schemas/index.js'

const Otp = mongoose.model('Otp', schemas.otp)

export default Otp
