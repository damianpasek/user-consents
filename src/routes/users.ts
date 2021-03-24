import { Router, Request, Response } from 'express'

const routes = (app: Router) => {
  app.get(
    '/users/:email',
    (_req: Request, res: Response) => res.send('ok'),
  )
}

export default routes
