import mongoose from 'mongoose'
import { ITweetResponse } from '../../../domain/dto/tweetResponse'
import { ModelToUser, UserModel } from './user'

const tweetSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
    trim: true,
    maxLength: 255
  },
  location: {
    type: String,
    trim: true
  },
  likes: {
    type: Number,
    default: 0
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
},
{
  timestamps: true,
  versionKey: false
}
)

export function ModelToTweet (tweet: mongoose.Document): ITweetResponse {
  const modelTweet = tweet.toObject()
  const user = new UserModel(modelTweet.user)
  return {
    id: modelTweet._id,
    user: ModelToUser(user),
    content: modelTweet.content,
    likes: modelTweet.likes,
    location: modelTweet.location,
    createdAt: modelTweet.createdAt,
    updatedAt: modelTweet.updatedAt
  }
}

export const TweetModel = mongoose.model('Tweet', tweetSchema)
