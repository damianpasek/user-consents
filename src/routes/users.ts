import { Router, Request, Response } from 'express'

import User from '../models/User'

const routes = (app: Router) => {
  app.get(
    '/users/:email',
    async (_req: Request, res: Response) => {
      const user = await User.findOne()
      console.log(user)
      res.send('ok')
    },
  )
}

export default routes
