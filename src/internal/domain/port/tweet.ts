import {ITweet} from "../entity/tweet";

export interface ITweetRepository {
  create: (tweet: ITweet) => Promise<ITweet>
}
