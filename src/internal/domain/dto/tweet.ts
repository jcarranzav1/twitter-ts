import { ITweet } from '../entity/tweet'

export interface ICreateTweetDto {
  content: string
  location: string
  likes?: number

}

export interface IUpdateTweetDto {
  content: string
  location: string
}

export function createTweetDtoToTweet (createTweetDto: ICreateTweetDto, idUser: string): ITweet {
  return {
    id: '',
    content: createTweetDto.content,
    location: createTweetDto.location,
    likes: createTweetDto.likes!,
    createdAt: new Date(),
    updatedAt: new Date(),
    user: idUser
  }
}
