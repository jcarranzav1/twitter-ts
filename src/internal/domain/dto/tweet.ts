import { ITweet } from '../entity/tweet'

export interface ICreateTweetDto {
  content: string
  user: string
}

export function createTweetDtoToTweet (createTweetDto: ICreateTweetDto): ITweet {
  return {
    content: createTweetDto.content,
    user: createTweetDto.user
  }
}
