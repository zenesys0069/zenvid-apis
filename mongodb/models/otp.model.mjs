import mongoose from 'mongoose'
import schemas from '../schemas/index.mjs'

const Otp = mongoose.model('Otp', schemas.otp)

export default Otp
