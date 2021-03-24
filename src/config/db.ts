import { Sequelize } from 'sequelize'

import config from './index'

const sequelize = new Sequelize(config.databaseConnection)

export default sequelize
