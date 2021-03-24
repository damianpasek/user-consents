import { Router } from 'express'
import { body, param } from 'express-validator'

import { changeEventController } from '../controllers/events'
import { EEventType } from '../models/Event'
import { enumToArray } from '../utils/enumToArray'
import { checkValidationErrors } from '../utils/validation'

const routes = (app: Router) => {
  app.post(
    '/users/:id/events',
    [
      param('id').isInt().toInt(),
      body('type').isIn(enumToArray(EEventType)),
      body('enabled').isBoolean().toBoolean(),
      checkValidationErrors(422),
    ],
    changeEventController,
  )
}

export default routes
