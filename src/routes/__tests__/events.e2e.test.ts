import request from 'supertest'

import app from '../../app'
import { EEventType } from '../../models/Event'
import User from '../../models/User'
import { clearDb, seedDb, syncDb } from '../../utils/sequelizeTestUtils'

describe('Routes: events', () => {
  beforeEach(async () => {
    await syncDb()
    await seedDb(['User', 'Event'])
  })

  afterEach(async () => {
    await clearDb()
  })

  describe('POST users/:id/events', () => {
    const mapConsents = (user: User) => user!.consents.map(c => c.toJSON())

    it('should validate type parameter', async () => {
      const { status } = await request(app)
        .post('/users/2/events')
        .send({ type: 'wrong_type', enabled: true })

      expect(status).toBe(422)
    })

    it('should validate enabled parameter', async () => {
      const { status } = await request(app)
        .post('/users/2/events')
        .send({ type: EEventType.SMSNotification, enabled: 'wrong_enabled_type' })

      expect(status).toBe(422)
    })

    it('should create consent when user doesnt have one', async () => {
      const USER_ID = 2
      const user = await User.findByPk(USER_ID)

      expect(user!.consents).toEqual([])

      const { status, body } = await request(app)
        .post(`/users/${USER_ID}/events`)
        .send({ type: EEventType.SMSNotification, enabled: true })

      expect(status).toBe(200)

      const updatedUser = await User.findByPk(USER_ID)

      expect(updatedUser!.consents.length).toBe(1)
      expect(mapConsents(updatedUser!)).toEqual(body.consents)

      expect(body.consents).toEqual([
        { type: EEventType.SMSNotification, enabled: true },
      ])
    })

    it('should update existing consent for user', async () => {
      const USER_ID = 1
      const user = await User.findByPk(USER_ID)

      expect(user!.consents.map(c => c.toJSON())).toEqual([
        { enabled: true, type: EEventType.EmailNotification },
        { enabled: false, type: EEventType.SMSNotification },
      ])

      const { status, body } = await request(app)
        .post(`/users/${USER_ID}/events`)
        .send({ type: EEventType.SMSNotification, enabled: true })

      expect(status).toBe(200)

      const updatedUser = await User.findByPk(USER_ID)

      expect(updatedUser!.consents.length).toBe(2)
      expect(mapConsents(updatedUser!)).toEqual(body.consents)

      expect(body.consents).toEqual([
        { type: EEventType.EmailNotification, enabled: true },
        { type: EEventType.SMSNotification, enabled: true },
      ])
    })
  })
})
