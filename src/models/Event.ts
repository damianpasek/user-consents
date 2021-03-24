import { Table, Column, Model, ForeignKey, BelongsTo, PrimaryKey } from 'sequelize-typescript'

import User from './User'

export enum EEventType {
  SMSNotification = 'sms_notification',
  EmailNotification = 'email_notification',
}

export interface IEvent {
  type: EEventType
  user_id: number
  enabled: boolean
}

export interface IEventCreateOptions extends IEvent {}

@Table({
  tableName: 'events',
  underscored: true,
  timestamps: true,
  paranoid: true,
})
class Event extends Model<IEvent, IEventCreateOptions> {
  @PrimaryKey
  @Column
  id: number

  @Column
  type: EEventType

  @ForeignKey(() => User)
  @Column
  user_id: number

  @Column
  enabled: boolean

  @BelongsTo(() => User, 'user_id')
  user: User
}

export default Event
