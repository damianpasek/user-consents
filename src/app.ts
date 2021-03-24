import express, { NextFunction, Request, Response } from 'express'
import bodyParser from 'body-parser'
import 'express-async-errors'

import { handleErrorMiddleware } from './middlewares/handleErrors'

import routes from './routes'

const app = express()

app.use(bodyParser.json())

routes(app)

app.use(handleErrorMiddleware)

app.use((_err: Error, _req: Request, res: Response, _next: NextFunction) => {
  res.status(500).send('Something went wrong')
})

export default app
