import { Optional } from 'sequelize'
import { Table, Column, Model, PrimaryKey, HasMany, DefaultScope } from 'sequelize-typescript'

import Event from './Event'

export interface IUser {
  id: number
  email: string
  consents: Event[]
}

export interface IUserCreateOptions extends Optional<IUser, 'id' | 'consents'> {}

@DefaultScope(() => ({
  include: [
    {
      model: Event,
      as: 'consents',
      attributes: ['type', 'enabled'],
    },
  ],
}))
@Table({
  tableName: 'users',
  underscored: true,
  timestamps: true,
  paranoid: true,
})
class User extends Model<IUser, IUserCreateOptions> {
  @PrimaryKey
  @Column
  id: number

  @Column
  email: string

  @HasMany(() => Event)
  consents: Event[]
}

export default User
