import Sequelize, { Optional, Model } from 'sequelize'
import sequelize from '../config/db'
import { enumToArray } from '../utils/enumToArray'

export enum EEventType {
  SMSNotification = 'sms_notification',
  EmailNotification = 'email_notification',
}

export interface IEvent {
  id: EEventType
  user_id: number
  enabled: boolean
}

export interface IEventCreateOptions extends Optional<IEvent, 'id'> {}

class Event extends Model<IEvent, IEventCreateOptions> implements IEvent {
  public id!: EEventType
  public user_id!: number
  public enabled!: boolean

  public readonly createdAt!: Date
  public readonly updatedAt!: Date
  public readonly deletedAt!: Date
}

Event.init({
  id: {
    type: Sequelize.ENUM,
    values: enumToArray(EEventType),
    allowNull: false,
  },
  user_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  enabled: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  },
}, {
  tableName: 'users',
  underscored: true,
  timestamps: true,
  paranoid: true,
  sequelize,
})

export default Event
