import { Router } from 'express'
import { body, param } from 'express-validator'

import { createUserController, getUserController, removeUserController } from '../controllers/users'
import { checkValidationErrors } from '../utils/validation'
import { isEmailTaken } from '../validators/users'

const routes = (app: Router) => {
  app.post(
    '/users',
    [
      body('email')
        .isString()
        .withMessage('Email is required')
        .isEmail()
        .withMessage('Value is not an email')
        .custom(isEmailTaken),
      checkValidationErrors(422),
    ],
    createUserController,
  )

  app.get(
    '/users/:id',
    [
      param('id').isInt().toInt(),
      checkValidationErrors(),
    ],
    getUserController,
  )

  app.delete(
    '/users/:id',
    [
      param('id').isInt().toInt(),
      checkValidationErrors(),
    ],
    removeUserController,
  )
}

export default routes
