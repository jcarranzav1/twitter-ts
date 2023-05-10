import {IUser} from "../entity/users";

export interface ISignupDTO {
    username: string
    name: string
    lastname: string
    email: string
    password: string
}

export interface ISignInDTO {
    email: string
    password: string
}

export interface IUpdateUserDTO {
    username?: string
    name?: string
    lastname?: string
    email?: string
}

export function signUpDTOToUser(signUpDTO: ISignupDTO) : IUser{
    return{
        id: "",
        username: signUpDTO.username,
        name: signUpDTO.name,
        lastname: signUpDTO.lastname,
        email: signUpDTO.email,
        password: signUpDTO.password,
        createdAt: new Date(),
        updatedAt: new Date(),

    }
}