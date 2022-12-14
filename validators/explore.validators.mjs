import { body, oneOf } from 'express-validator'

// validates login endpoint
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

export const findUser = [
  body('search').notEmpty().withMessage('Search is required'),
  body('search').isString().withMessage('Search should be string'),
]
export const like = [
  body('video_id').notEmpty().withMessage('video_id is required!'),
  body('video_id').isString().withMessage('video_id should be string'),
]

export const postComment = [
  body('video_id').notEmpty().withMessage('video_id is required!'),
  body('video_id').isString().withMessage('video_id should be string'),
  body('comment').notEmpty().withMessage('comment is required!'),
  body('comment').isString().withMessage('comment should be string'),
]
export const getComment = [
  body('video_id').notEmpty().withMessage('video_id is required!'),
  body('video_id').isString().withMessage('video_id should be string'),
]
