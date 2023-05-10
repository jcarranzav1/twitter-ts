import { inject, injectable } from 'inversify'
import { ITweetRepository } from '../domain/port/tweet'
import { createTweetDtoToTweet, ICreateTweetDto, IUpdateTweetDto } from '../domain/dto/tweet'
import { TYPES } from '../../constants/symbolContainers'
import { ITweetResponse } from '../domain/dto/tweetResponse'
import { MyError } from '../domain/errors/error'

const tweetNotExist = 'not exist tweet with this id'
const forbiddenAction = 'Forbidden'

export interface ITweetService {
  createTweet: (createTweetDto: ICreateTweetDto, id: string) => Promise<ITweetResponse>
  getTweetByID: (id: string) => Promise<ITweetResponse>
  getTweetsByUserID: (userID: string) => Promise<ITweetResponse[]>
  updateTweet: (updateTweet: IUpdateTweetDto, userID: string, tweetID: string) => Promise<ITweetResponse>
  deleteTweet: (userID: string, tweetID: string) => Promise<void>
}

@injectable()
export class TweetService implements ITweetService {
  constructor (@inject(TYPES.ITweetRepo) private readonly tweetRepository: ITweetRepository
  ) {
  }

  async createTweet (createTweetDto: ICreateTweetDto, id: string): Promise<ITweetResponse> {
    try {
      const tweet = createTweetDtoToTweet(createTweetDto, id)
      return await this.tweetRepository.createTweet(tweet)
    } catch (error: any) {
      throw error
    }
  }

  async getTweetByID (id: string): Promise<ITweetResponse> {
    try {
      const tweet = await this.tweetRepository.getTweetByID(id)
      if (tweet == null) {
        throw new MyError(400, tweetNotExist)
      }
      return tweet
    } catch (error: any) {
      throw error
    }
  }

  async getTweetsByUserID (userID: string): Promise<ITweetResponse[]> {
    return await this.tweetRepository.getTweetsByUserID(userID)
  }

  async updateTweet (update: IUpdateTweetDto, userID: string, tweetID: string): Promise<ITweetResponse> {
    try {
      const tweetByID = await this.tweetRepository.getTweetByID(tweetID)

      if (tweetByID == null) {
        throw new MyError(400, tweetNotExist)
      }
      if (String(tweetByID.user.id) !== userID) {
        throw new MyError(403, forbiddenAction)
      }

      const tweet = await this.tweetRepository.updateTweet(tweetID, update)

      if (tweet == null) {
        throw new MyError(400, tweetNotExist)
      }

      return tweet
    } catch (error: any) {
      throw error
    }
  }

  async deleteTweet (userID: string, tweetID: string): Promise<void> {
    try {
      const tweetByID = await this.tweetRepository.getTweetByID(tweetID)

      if (tweetByID == null) {
        throw new MyError(400, tweetNotExist)
      }
      if (String(tweetByID.user.id) !== userID) {
        throw new MyError(403, forbiddenAction)
      }

      await this.tweetRepository.deleteTweet(tweetID)
    } catch (err) {
      throw err
    }
  }
}
