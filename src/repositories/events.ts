import sequelize from '../config/db'
import Event, { EEventType } from '../models/Event'

export const changeUserConsent = async (userId: number, type: EEventType, enabled: boolean): Promise<void> => {
  const transaction = await sequelize.transaction()

  await Event.destroy({ where: { user_id: userId, type }, transaction })
  await Event.create({ user_id: userId, type, enabled }, { transaction })

  await transaction.commit()
}
