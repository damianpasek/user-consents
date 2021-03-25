import { findUserByEmail } from '../repositories/users'

export const isEmailTaken = async (email: string): Promise<void> => {
  const user = await findUserByEmail(email)
  if (user) throw new Error('Email is taken')
}
