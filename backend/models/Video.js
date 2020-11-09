import mongoose from 'mongoose'

const videoSchema = mongoose.Schema(
  {
    formation: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Formation',
    },
    title: {
      type: String,
      required: true,
    },
    summary: {
      type: String,
      required: true,
    },
    URL: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

// Timestamps give us created_at and updated_at fields automatically

const Video = mongoose.model('Video', videoSchema)

export default Video
