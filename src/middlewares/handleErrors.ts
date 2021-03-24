import { Request, Response, NextFunction } from 'express'
import { ResponseError } from '../utils/errors'

export const handleErrorMiddleware = (err: Error, _req: Request, res: Response, next: NextFunction) => {
  if (err instanceof ResponseError && err.silent) {
    res.status(err.status).json(err.body)
    return
  }
  next(err)
}
