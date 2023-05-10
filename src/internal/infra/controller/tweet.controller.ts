import { NextFunction, Request, Response } from 'express'
import { inject } from 'inversify'
import {
  controller,
  httpDelete,
  httpGet,
  httpPost,
  httpPut,
  request,
  requestParam,
  response,
} from 'inversify-express-utils'
import { TYPES } from '../../../constants/symbolContainers'
import { ITweetService } from '../../app/tweet.service'
import { ICreateTweetDto, IUpdateTweetDto } from '../../domain/dto/tweet'
import { authMiddleware } from '../middlewares/auth'

@controller('/tweets')
export class TweetController {
  constructor(
    @inject(TYPES.ITweetService) private readonly tweetService: ITweetService,
  ) {}

  @httpPost('/', authMiddleware)
  async createTweet(
    @request() req: Request,
    @response() res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const createTweet: ICreateTweetDto = req.body
      const { id } = req.body.decoded
      const tweet = await this.tweetService.createTweet(createTweet, id)
      res.json({
        message: 'tweet was created successfully',
        data: tweet,
      })
    } catch (err) {
      next(err)
    }
  }

  @httpGet('/:id', authMiddleware)
  async getTweetByID(
    @requestParam('id') id: string,
    @response() res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const tweet = await this.tweetService.getTweetByID(id)
      res.json({
        message: 'get tweet by id successfully',
        data: tweet,
      })
    } catch (err) {
      next(err)
    }
  }

  @httpGet('/user/:id', authMiddleware)
  async getTweetsByUserID(
    @request() req: Request,
    @response() res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { id } = req.body.decoded
      const tweet = await this.tweetService.getTweetsByUserID(id)
      res.json({
        message: 'get all users tweets successfully',
        data: tweet,
      })
    } catch (err) {
      next(err)
    }
  }

  @httpPut('/:id', authMiddleware)
  async updateTweet(
    @requestParam('id') id: string,
    @request() req: Request,
    @response() res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const updateTweet: IUpdateTweetDto = req.body
      const { id: userID } = req.body.decoded
      const tweet = await this.tweetService.updateTweet(updateTweet, userID, id)
      res.json({
        message: 'tweet was updated successfully',
        data: tweet,
      })
    } catch (err) {
      next(err)
    }
  }

  @httpDelete('/:id', authMiddleware)
  async deleteTweet(
    @requestParam('id') id: string,
    @request() req: Request,
    @response() res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { id: userID } = req.body.decoded
      await this.tweetService.deleteTweet(userID, id)
      res.json({
        message: 'tweet was deleted successfully',
      })
    } catch (err) {
      next(err)
    }
  }
}
