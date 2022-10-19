import mongoose from 'mongoose'

const watchSchema = new mongoose.Schema(
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
    comments: {
      type: Array,
      default: [],
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

export default watchSchema
