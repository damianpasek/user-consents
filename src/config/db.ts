import { Sequelize } from 'sequelize-typescript'

import config from './index'
import models from '../models'

const options = { models, logging: config.env === 'test' ? false : config.verbose }

const sequelize = new Sequelize(config.databaseConnection, options)

export default sequelize
