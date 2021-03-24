import { Sequelize } from 'sequelize-typescript'

import config from './index'
import models from '../models'

const sequelize = new Sequelize(config.databaseConnection, { models })

export default sequelize
