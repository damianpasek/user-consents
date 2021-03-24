import { Router } from 'express'

import userRoutes from './users'
import eventRoutes from './events'

const setup = (app: Router) => {
  userRoutes(app)
  eventRoutes(app)
}

export default setup
