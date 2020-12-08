import mongoose from 'mongoose'

const formationSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    shortDescription: {
      type: String,
      required: true,
    },
    longDescription: {
      type: String,
      required: true,
    },
    logo: {
      type: String,
      required: true,
    },
    backgroundImage: {
      type: String,
      required: true,
    },
    thumbnail: {
      type: String,
      required: true,
    },
    demoVideo: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    difficulty: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

const Formation = mongoose.model('Formation', formationSchema)

export default Formation
