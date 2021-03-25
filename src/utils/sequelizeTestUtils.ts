import db from '../config/db'
import { EEventType } from '../models/Event'

const mocks: any = {
  User: [
    {
      id: 1,
      email: 'test_1@email.com',
    },
    {
      id: 2,
      email: 'test_2@email.com',
    },
  ],
  Event: [
    {
      id: 1,
      type: EEventType.EmailNotification,
      user_id: 1,
      enabled: true,
    },
    {
      id: 2,
      type: EEventType.SMSNotification,
      user_id: 1,
      enabled: false,
    },
  ],
}

export const syncDb = async () => {
  await db.drop()
  await db.sync({ force: true })
}

export const clearDb = () => db.drop()

export const seedDb = async (modelNames: string[]) => {
  for (const modelName of modelNames) {
    await db.models[modelName].bulkCreate(mocks[modelName])
  }
}
