import User, { IUserCreateOptions } from '../models/User'
import { NotFoundError } from '../utils/errors'

export const findUserByEmail = async (email: string): Promise<User | null> => User.findOne({ where: { email } })

export const createUser = async (opts: IUserCreateOptions): Promise<User> => User.create(opts)

export const findUserById = async (id: number): Promise<User | null> => User.findByPk(id)

export const removeUser = async (id: number): Promise<void> => {
  const user = await User.findByPk(id)

  if (!user) throw new NotFoundError('user')

  return user.destroy()
}
