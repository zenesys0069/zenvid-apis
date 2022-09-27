import mongoose from 'mongoose'

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
  expireAt: { type: Date, default: new Date() },
})

otpSchema.index(
  {
    expireAt: 1,
  },
  {
    expireAfterSeconds: 60, // expires at 60 seconds
  }
)

export default otpSchema
