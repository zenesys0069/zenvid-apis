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
})

export default otpSchema
