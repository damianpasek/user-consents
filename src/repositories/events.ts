import Event, { EEventType } from '../models/Event'

export const changeUserConsent = async (userId: number, type: EEventType, enabled: boolean): Promise<void> => {
  await Event.destroy({ where: { user_id: userId, type } })
  await Event.create({ user_id: userId, type, enabled })
}
