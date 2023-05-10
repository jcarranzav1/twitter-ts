import { Container } from 'inversify'
import { TYPES } from '../constants/symbolContainers'
import { ITweetService, TweetService } from '../internal/app/tweet.service'
import { IUserService, UserService } from '../internal/app/user.service'
import { ITweetRepository } from '../internal/domain/port/tweet'
import { IUserRepository } from '../internal/domain/port/user'
import { TweetRepository } from '../internal/infra/adapter/repo/tweet.repo'
import { UserRepository } from '../internal/infra/adapter/repo/user.repo'
import { TweetController } from '../internal/infra/controller/tweet.controller'
import { UserController } from '../internal/infra/controller/user.controller'

const container = new Container()
container.bind<ITweetRepository>(TYPES.ITweetRepo).to(TweetRepository)
container.bind<IUserRepository>(TYPES.IUserRepo).to(UserRepository)

container.bind<ITweetService>(TYPES.ITweetService).to(TweetService)
container.bind<IUserService>(TYPES.IUserService).to(UserService)

container.bind<TweetController>(TYPES.TweetController).to(TweetController)
container.bind<UserController>(TYPES.UserController).to(UserController)

export { container }
