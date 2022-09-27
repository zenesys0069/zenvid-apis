import mongoose from 'mongoose'
import moment from 'moment'

const { Schema } = mongoose

const otpSchema = new Schema({
  email: {
    type: String,
    trim: true,
    unique: true,
    required: true,
  },
  otp: {
    type: Number,
    trim: true,
    required: true,
  },
  expireAt: { type: Date, default: moment(new Date()).add(5, 'm').toDate() },
})
otpSchema.index(
  {
    expireAt: 1,
  },
  {
    expireAfterSeconds: 60 * 5, // expires at 300 seconds
  }
)

export default otpSchema
