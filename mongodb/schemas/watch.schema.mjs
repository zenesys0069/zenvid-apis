import mongoose, { Schema } from 'mongoose'

export const watchSchema = new Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    likes: {
      type: Number,
      default: 0,
    },
    watch: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

export const commentsSchema = new Schema({
  videoID: {
    type: String,
    required: true,
  },
  comment: {
    type: String,
    required: true,
    trim: true,
    min: 1,
    max: 512,
  },

  fullName: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  picture: {
    type: String,
  },
})
