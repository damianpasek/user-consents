import { Request, Response } from 'express'
import { changeUserConsent } from '../repositories/events'
import { findUserById } from '../repositories/users'

export const changeEventController = async (req: Request, res: Response): Promise<void> => {
  const { type, enabled } = req.body
  const userId = +req.params.id

  await changeUserConsent(userId, type, enabled)

  const user = await findUserById(userId)

  res.json(user)
}
