import { Router } from 'express'

import userRoutes from './users'

const setup = (app: Router) => {
  userRoutes(app)
}

export default setup
