import { body } from 'express-validator'

// validates login endpoint
export const username = [
  body('username').notEmpty().withMessage('Username is required!'),
]
