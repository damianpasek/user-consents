import { Request, Response } from 'express'
import { createUser, findUserById, removeUser } from '../repositories/users'

export const getUserController = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params

  const user = await findUserById(Number(id))

  res.json(user)
}

export const createUserController = async (req: Request, res: Response): Promise<void> => {
  const { email } = req.body

  const user = await createUser({ email })

  res.json(user)
}

export const removeUserController = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params

  await removeUser(Number(id))

  res.json({ success: true })
}
