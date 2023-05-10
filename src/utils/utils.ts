import {sign} from "jsonwebtoken";
import config from "../config/config";

export const signToken = (payload:any, expiresIn:string = config().jwtExpire): string =>{
    return  sign(payload, config().jwtSecret, {
        expiresIn,
    });
}
