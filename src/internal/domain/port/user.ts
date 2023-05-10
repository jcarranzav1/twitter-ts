import { IUser } from '../entity/users'

export interface IUserRepository {
  createUser: (user: IUser) => Promise<IUser>
  getUserByEmail: (email: string) => Promise<IUser | null>

  getUserByID: (id: string) => Promise<IUser | null>
}
