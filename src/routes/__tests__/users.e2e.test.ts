import request from 'supertest'

import app from '../../app'
import { EEventType } from '../../models/Event'
import User from '../../models/User'
import { clearDb, seedDb, syncDb } from '../../utils/sequelizeTestUtils'

describe('Routes: users', () => {
  beforeEach(async () => {
    await syncDb()
    await seedDb(['User', 'Event'])
  })

  afterEach(async () => {
    await clearDb()
  })

  describe('POST /users', () => {
    describe('validation', () => {
      it.each([
        ['Email is required', undefined],
        ['Value is not an email', 'notEmail'],
        ['Email is taken', 'test_1@email.com'],
      ] as [string, string?][])(
        'should return 422 status when %s',
        async (errorMessage: string, email: string | undefined) => {
          const { status, body } = await request(app).post('/users').send({ email })

          expect(status).toBe(422)
          expect(body).toEqual({
            success: false,
            errors: {
              email: errorMessage,
            },
          })
        })
    })

    it('should create user after validation passed', async () => {
      const email = 'test_new@email.com'

      const { status, body } = await request(app).post('/users').send({ email })

      expect(status).toBe(200)
      expect(body.email).toBe(email)

      const user = await User.findByPk(body.id)

      expect(user).not.toBe(null)
      expect(user!.email).toBe(email)
    })
  })

  describe('GET /users/:id', () => {
    it('should return user with consents when it exists', async () => {
      const { body, status } = await request(app).get('/users/1')

      expect(status).toBe(200)
      expect(body).toMatchObject({
        id: 1,
        email: 'test_1@email.com',
        consents: [
          {
            type: EEventType.EmailNotification,
            enabled: true,
          },
          {
            type: EEventType.SMSNotification,
            enabled: false,
          },
        ],
      })
    })

    it('should return empty array of consents when they not exist', async () => {
      const { body, status } = await request(app).get('/users/2')

      expect(status).toBe(200)
      expect(body.consents).toEqual([])
    })

    it('should return 404 status when user was not found', async () => {
      const { status } = await request(app).get('/users/100')

      expect(status).toBe(404)
    })

    it('should return 400 status when id is not integer', async () => {
      const { status } = await request(app).get('/users/abc')

      expect(status).toBe(400)
    })
  })

  describe('DELETE /users/:id', () => {
    it('should remove user when it exists', async () => {
      // we cannot use User.count() cause Sequelize has bug with counting with associations
      expect((await User.findAll()).length).toBe(2)

      const { body, status } = await request(app).delete('/users/1')

      expect(status).toBe(200)
      expect(body).toEqual({ success: true })

      expect((await User.findAll()).length).toBe(1)
    })

    it('should return 404 status when user does not exist', async () => {
      const { status } = await request(app).delete('/users/100')

      expect(status).toBe(404)
    })

    it('should return 400 status when id is not integer', async () => {
      const { status } = await request(app).get('/users/abc')

      expect(status).toBe(400)
    })
  })
})
