import User from '../../models/User'
import { NotFoundError } from '../../utils/errors'
import { clearDb, seedDb, syncDb } from '../../utils/sequelizeTestUtils'
import { createUser, findUserByEmail, findUserById, removeUser } from '../users'

describe('Repositories: users', () => {
  beforeEach(async () => {
    await syncDb()
    await seedDb(['User'])
  })

  afterEach(async () => {
    await clearDb()
  })

  describe('findUserByEmail', () => {
    it('should return User object if it exists', async () => {
      const user = await findUserByEmail('test_1@email.com')

      expect(user).not.toBe(null)
      expect(user!.email).toEqual('test_1@email.com')
    })

    it('should return null if it not exists', async () => {
      const user = await findUserByEmail('non_existent@email.com')

      expect(user).toBe(null)
    })
  })

  describe('createUser', () => {
    it('should create user in database', async () => {
      const user = await createUser({ email: 'test_3@email.com' })
      const count = await User.count()

      expect(user).not.toBe(null)
      expect(count).toBe(3)
    })

    it('should throw error on unique constraint', async () => {
      const opts = { email: 'test_1@email.com' }

      await expect(createUser(opts)).rejects.toThrow()
    })
  })

  describe('findUserById', () => {
    it('should return User object if it exists', async () => {
      const user = await findUserById(1)

      expect(user).not.toBe(null)
    })

    it('should throw NotFoundError when user was not found', async () => {
      await expect(findUserById(100)).rejects.toThrow(NotFoundError)
    })
  })

  describe('removeUser', () => {
    it('should soft delete user when it exists', async () => {
      expect(await User.count()).toBe(2)

      await removeUser(1)

      expect(await User.count()).toBe(1)
      expect(await User.count({ paranoid: false })).toBe(2)
    })

    it('should throw NotFoundError when user was not found', async () => {
      await expect(removeUser(100)).rejects.toThrow(NotFoundError)
    })
  })
})
