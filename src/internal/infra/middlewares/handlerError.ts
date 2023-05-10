import { NextFunction, Request, Response } from 'express'

export function errorHandler (error: any, _req: Request, res: Response, _next: NextFunction): void {
  const { message, status = 500 } = error

  res.status(status)
  res.json({
    status,
    message
  })
}
