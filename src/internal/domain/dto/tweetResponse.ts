import { ITweet } from '../entity/tweet'
import { IUser } from '../entity/users'

export interface ITweetResponse extends Omit<ITweet, 'user'> {
  user: IUser
}
