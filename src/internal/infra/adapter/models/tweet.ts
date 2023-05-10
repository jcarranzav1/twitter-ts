 import mongoose from 'mongoose'

const tweetSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
    trim: true,
    maxLength: 255,
  },
  location: {
    type: String,
    trim: true,
  },
  likes: {
    type: Number,
    default: 0,
  },
  publishDate: {
    type: Date,
    default: new Date(),
  },
})

export const TweetModel = mongoose.model('Tweet', tweetSchema)
