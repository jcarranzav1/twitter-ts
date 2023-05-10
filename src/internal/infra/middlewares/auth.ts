import { NextFunction, Request, Response } from 'express'
import { verify } from 'jsonwebtoken'
import config from '../../../config/config'

const message = 'Unauthorized'
const statusCode = 401

export function authMiddleware(
  req: Request,
  _res: Response,
  next: NextFunction
) {
  const token = req.headers.authorization?.split(' ')[1]

  if (token) {
    verify(token, config().jwtSecret, (err, decoded) => {
      if (err != null) {
        next({
          statusCode: 401,
          message: 'Unauthorized'
        })
      }
      if (decoded) {
        req.body.decoded = decoded
        next()
      }
    })
  } else {
    next({
      statusCode,
      message
    })
  }
}
