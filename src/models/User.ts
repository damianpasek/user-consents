import Sequelize, { Optional, Model } from 'sequelize'
import sequelize from '../config/db'

export interface IUser {
  id: number
  email: string
}

export interface IUserCreateOptions extends Optional<IUser, 'id'> {}

class User extends Model<IUser, IUserCreateOptions> implements IUser {
  public id!: number
  public email!: string

  public readonly createdAt!: Date
  public readonly updatedAt!: Date
  public readonly deletedAt!: Date
}

User.init({
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
}, {
  tableName: 'users',
  underscored: true,
  timestamps: true,
  paranoid: true,
  sequelize,
})

export default User
