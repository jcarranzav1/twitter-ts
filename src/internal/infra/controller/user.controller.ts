import { NextFunction, Request, Response } from 'express'
import { inject } from 'inversify'
import {
  controller,
  httpGet,
  httpPost,
  httpPut,
  request,
  response,
} from 'inversify-express-utils'
import { TYPES } from '../../../constants/symbolContainers'
import { IUserService } from '../../app/user.service'
import { ISignInDTO, ISignupDTO, IUpdateUserDTO } from '../../domain/dto/users'
import { authMiddleware } from '../middlewares/auth'

@controller('/users')
export class UserController {
  constructor(
    @inject(TYPES.IUserService) private readonly userService: IUserService,
  ) {}

  @httpPost('/signup')
  async signup(
    @request() req: Request,
    @response() res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const userCreate: ISignupDTO = req.body
      const { user, token } = await this.userService.signup(userCreate)
      res.status(200).json({
        data: user,
        meta: {
          token,
        },
      })
    } catch (error) {
      next(error)
    }
  }

  @httpPost('/login')
  async login(
    @request() req: Request,
    @response() res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const userLogin: ISignInDTO = req.body
      const { user, token } = await this.userService.login(userLogin)
      res.status(200).json({
        data: user,
        meta: {
          token,
        },
      })
    } catch (error) {
      next(error)
    }
  }

  @httpGet('/profile', authMiddleware)
  async profile(
    @request() req: Request,
    @response() res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { id } = req.body.decoded
      const user = await this.userService.profile(id)

      res.status(200).json({
        data: user,
      })
    } catch (error) {
      next(error)
    }
  }

  @httpPut('/profile', authMiddleware)
  async update(
    @request() req: Request,
    @response() res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const userUpdate: IUpdateUserDTO = req.body
      res.status(200).json({
        data: userUpdate,
      })
    } catch (error) {
      next(error)
    }
  }
}
