import { Request, Response } from 'express'
import {ITweetService} from "../../app/tweet.service";
import { controller, httpPost, request, response} from "inversify-express-utils";
import {inject} from "inversify";
import {TYPES} from "../../../constants/symbolContainers";
import {ICreateTweetDto} from "../../domain/dto/tweet";


@controller("/tweets")
export class TweetController{
    constructor(@inject(TYPES.ITweetService) private tweetService: ITweetService) {

    }
    @httpPost('/')
    async create(@request() req: Request, @response()res: Response): Promise<void> {
        const tweetCreate: ICreateTweetDto = req.body
        const tweet = await this.tweetService.create(tweetCreate);
        res.json(tweet)
    }
}