import { injectable } from 'inversify'
import { IUser } from '../../../domain/entity/users'
import { ModelToUser, UserModel } from '../models/user'
import { IUserRepository } from '../../../domain/port/user'

@injectable()
export class UserRepository implements IUserRepository {
  async createUser (user: IUser): Promise<IUser> {
    const newUser = new UserModel(user)
    await newUser.save()
    return ModelToUser(newUser)
  }

  async getUserByEmail (email: string): Promise<IUser | null> {
    const user = await UserModel.findOne({ email })
    if (user != null) {
      return ModelToUser(user)
    }
    return null
  }

  async getUserByID (id: string): Promise<IUser | null> {
    const user = await UserModel.findById(id)
    if (user != null) {
      return ModelToUser(user)
    }
    return null
  }
}
