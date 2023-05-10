import {IUser} from "../entity/users";

export interface IUserResponse extends Omit<IUser, 'password'> {
}
export interface IUserResponseDTO {
    user: IUserResponse;
    token: string;
}