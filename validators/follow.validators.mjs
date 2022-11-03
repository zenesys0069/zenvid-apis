import { body } from 'express-validator'
export const username = [
  body('username').notEmpty().withMessage('Username is required!'),
  body('username').isString().withMessage('Username should be string'),
  body('username')
    .isLength({ min: 6 })
    .withMessage('username should be at least 6 characters'),
  body('username')
    .isLength({ max: 20 })
    .withMessage('username should be max 20 characters'),
]
