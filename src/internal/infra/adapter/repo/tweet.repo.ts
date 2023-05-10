import { injectable } from 'inversify'
import { ITweetRepository } from '../../../domain/port/tweet'
import { ITweet } from '../../../domain/entity/tweet'
import { ModelToTweet, TweetModel } from '../models/tweet'
import { ITweetResponse } from '../../../domain/dto/tweetResponse'
import { IUpdateTweetDto } from '../../../domain/dto/tweet'

@injectable()
export class TweetRepository implements ITweetRepository {
  async createTweet (tweet: ITweet): Promise<ITweetResponse> {
    const newTweet = await new TweetModel(tweet).populate('user')
    await newTweet.save()
    return ModelToTweet(newTweet)
  }

  async getTweetByID (tweetID: string): Promise<ITweetResponse | null> {
    try {
      const tweet = await TweetModel.findById(tweetID).populate('user')
      if (tweet != null) {
        return ModelToTweet(tweet)
      }
      return null
    } catch (err) {
      throw err
    }
  }

  async getTweetsByUserID (userID: string): Promise<ITweetResponse[]> {
    const tweets = await TweetModel.find({ user: userID }).populate('user')
    return tweets.map(tweet => ModelToTweet(tweet))
  }

  async updateTweet (tweetID: string, update: IUpdateTweetDto): Promise<ITweetResponse | null> {
    const tweet = await TweetModel.findByIdAndUpdate(tweetID, update, { new: true })
    if (tweet != null) {
      return ModelToTweet(tweet)
    }
    return null
  }

  async deleteTweet (tweetID: string): Promise<void> {
    try {
      await TweetModel.findByIdAndDelete(tweetID)
    } catch (err) {
      throw err
    }
  }
}
