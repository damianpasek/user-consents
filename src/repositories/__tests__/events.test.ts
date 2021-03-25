import Event, { EEventType } from '../../models/Event'

import { clearDb, seedDb, syncDb } from '../../utils/sequelizeTestUtils'
import { changeUserConsent } from '../events'

describe('Repositories: events', () => {
  beforeEach(async () => {
    await syncDb()
    await seedDb(['User', 'Event'])
  })

  afterEach(async () => {
    await clearDb()
    jest.restoreAllMocks()
  })

  describe('changeUserConsent', () => {
    const getUserConsent = (userId: number, type: EEventType): Promise<Event | null> => Event.findOne({
      where: { user_id: userId, type },
    })

    it('should change user consent if it exists', async () => {
      const beforeChange = await getUserConsent(1, EEventType.EmailNotification)
      expect(beforeChange!.enabled).toBe(true)

      await changeUserConsent(1, EEventType.EmailNotification, false)

      const afterChange = await getUserConsent(1, EEventType.EmailNotification)
      expect(afterChange!.enabled).toBe(false)
    })

    it('when changing user consent it should soft delete old one', async () => {
      expect(await Event.count({ where: { user_id: 1 } })).toBe(2)

      await changeUserConsent(1, EEventType.EmailNotification, false)

      expect(await Event.count({ where: { user_id: 1 } })).toBe(2)
      expect(await Event.count({ where: { user_id: 1 }, paranoid: false })).toBe(3)
    })

    it('should not commit transaction in case of error', async () => {
      jest.spyOn(Event, 'destroy').mockImplementation(() => {
        throw new Error('Database error')
      })

      const before = await Event.findAll({ where: { user_id: 1 } })

      await expect(changeUserConsent(1, EEventType.SMSNotification, false))
        .rejects
        .toThrow('Database error')

      const after = await Event.findAll({ where: { user_id: 1 } })

      expect(before).toEqual(after)
    })
  })
})
