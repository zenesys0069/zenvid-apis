import { body, oneOf } from 'express-validator'

// validates login endpoint
export const username = [
  body('username').notEmpty().withMessage('Username is required!'),
  body('username').isString().withMessage('Username should be string'),
]

export const findUser = [
  body('search').notEmpty().withMessage('Search is required'),
  body('search').isString().withMessage('Search should be string'),
]
