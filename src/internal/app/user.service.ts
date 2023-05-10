import {inject, injectable} from "inversify";
import {compare, hash} from 'bcryptjs';
import {TYPES} from "../../constants/symbolContainers";
import {ISignInDTO, ISignupDTO, signUpDTOToUser} from "../domain/dto/users";
import {IUserRepository} from "../domain/port/user";
import {signToken} from "../../utils/utils";
import {IUserResponse, IUserResponseDTO} from "../domain/dto/usersResponse";
import {MyError} from "../domain/errors/error";

const loginFormError = "Incorrect email or password"
const getUserByIDError = "This user is not registered"
export interface IUserService {
    signup: (createUserDTO: ISignupDTO) => Promise<IUserResponseDTO>;
    login: (loginDTO: ISignInDTO) => Promise<IUserResponseDTO>;
    profile: (id: string) => Promise<IUserResponse>;
}
@injectable()
export class UserService implements IUserService {
    constructor (@inject(TYPES.IUserRepo) private readonly userRepository: IUserRepository
    ) {
    }
    async signup(userDTO: ISignupDTO) : Promise<IUserResponseDTO> {
        try{
            userDTO.password = await hash(userDTO.password, 10)
            const user = signUpDTOToUser(userDTO)
            const newUser = await this.userRepository.createUser(user)
            const token = signToken({id: newUser})
            return {user : newUser, token}
        }catch (error:any) {
            throw error;
        }
    }

    async login(loginDTO: ISignInDTO) : Promise<IUserResponseDTO> {
        try{
            const user = await this.userRepository.getUserByEmail(loginDTO.email)
            if (!user) {
                throw new MyError(400, loginFormError)
            }

            const isMatch = await compare(loginDTO.password, user.password);

            if (!isMatch) {
                throw new MyError(400, loginFormError)
            }

            const token = signToken({id: user.id})
            return {user, token}
        }catch (error:any) {
            throw error;
        }
    }

    async profile(id :string) : Promise<IUserResponse> {
        try{
            const user = await this.userRepository.getUserByID(id)
            if (!user) {
                throw new MyError(400, getUserByIDError)
            }
            return user
        }catch (error:any) {
            throw error;
        }
    }
}

