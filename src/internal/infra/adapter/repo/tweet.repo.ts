import { injectable} from "inversify";
import {ITweetRepository} from "../../../domain/port/tweet";
import {ITweet} from "../../../domain/entity/tweet";
import {TweetModel} from "../models/tweet";

@injectable()
export class TweetRepository implements ITweetRepository {
    async create(tweet: ITweet): Promise<ITweet> {
        const tweetModel = new TweetModel(tweet)
        tweet = await tweetModel.save()

        return tweet
    }
}