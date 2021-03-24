import express, { NextFunction, Request, Response } from 'express'
import bodyParser from 'body-parser'
import 'express-async-errors'

import './config/db'

import routes from './routes'
import { handleErrorMiddleware } from './middlewares/handleErrors'

const app = express()

app.use(bodyParser.json())

routes(app)

app.use(handleErrorMiddleware)

app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err)
  res.status(500).send('Something went wrong')
})

export default app
