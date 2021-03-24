import { NextFunction, Request, Response } from 'express'
import { validationResult } from 'express-validator'

export const checkValidationErrors = (status: number = 400) => (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const errors = validationResult(req).formatWith(({ msg }: any) => msg)

  return errors.isEmpty()
    ? next()
    : res.status(status).json({ errors: errors.mapped(), success: false })
}
