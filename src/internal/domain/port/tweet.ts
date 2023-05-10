import { ITweet } from '../entity/tweet'
import { ITweetResponse } from '../dto/tweetResponse'
import { IUpdateTweetDto } from '../dto/tweet'

export interface ITweetRepository {
  createTweet: (tweet: ITweet) => Promise<ITweetResponse>
  getTweetByID: (id: string) => Promise<ITweetResponse | null>
  getTweetsByUserID: (userID: string) => Promise<ITweetResponse[]>
  updateTweet: (tweetID: string, update: IUpdateTweetDto) => Promise<ITweetResponse | null>
  deleteTweet: (userID: string) => Promise<void>
}
