import User from '../../models/User'
import * as userRepository from '../../repositories/users'
import { isEmailTaken } from '../users'

describe('Validators: users', () => {
  describe('isEmailTaken', () => {
    beforeEach(() => {
      jest.spyOn(userRepository, 'findUserByEmail')
    })
    afterEach(() => {
      jest.restoreAllMocks()
    })

    it('should throw an error if email is taken', async () => {
      (userRepository.findUserByEmail as jest.Mock).mockResolvedValue({ email: '123@email.com' } as User)

      await expect(isEmailTaken('123@email.com')).rejects.toThrow('Email is taken')
    })

    it('should return undefined if email is not taken', async () => {
      (userRepository.findUserByEmail as jest.Mock).mockResolvedValue(null)

      expect(await isEmailTaken('123@email.com')).toBe(undefined)
    })
  })
})
