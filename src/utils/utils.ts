import { sign } from 'jsonwebtoken'
import config from '../config/config'

export const signToken = (payload: any, expiresIn: string = config().jwtExpire): string => {
  return sign(payload, config().jwtSecret, {
    expiresIn
  })
}

export function formatZodErrors (errors: any): string {
  let errorMessage = ''
  errors.forEach((error: any) => {
    errorMessage += `${error.path[0]}: ${error.message}\n`
  })
  return errorMessage
}
