import {inject, injectable} from "inversify";
import {ITweetRepository} from "../domain/port/tweet";
import {ITweet} from "../domain/entity/tweet";
import {createTweetDtoToTweet, ICreateTweetDto} from "../domain/dto/tweet";
import {TYPES} from "../../constants/symbolContainers";

export interface ITweetService {
    create: (createTweetDto: ICreateTweetDto) => Promise<ITweet>;
}
@injectable()
export class TweetService implements ITweetService {
    constructor (@inject(TYPES.ITweetRepo) private readonly tweetRepository: ITweetRepository
    ) {
    }
    async create(createTweetDto: ICreateTweetDto) : Promise<ITweet> {
        const tweet = createTweetDtoToTweet(createTweetDto)
        return await this.tweetRepository.create(tweet);
    }
}

