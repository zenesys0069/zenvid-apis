import { body, param } from 'express-validator'

// validates login endpoint
export const login = [
  body('email').notEmpty().withMessage('email is required!'),
  body('email').isEmail().withMessage('a valid email is required'),

  body('password').notEmpty().withMessage('password is required!'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('password should be atleast 6 characters'),
  body('password')
    .isLength({ max: 50 })
    .withMessage('password should be max 50 characters'),
]

export const otp = [
  body('email').notEmpty().withMessage('email is required!'),
  body('email').isEmail().withMessage('a valid email is required'),
]
export const verifyOtp = [
  body('email').notEmpty().withMessage('Email is required!'),
  body('email').isEmail().withMessage('A valid email is required'),
  body('otp').notEmpty().withMessage('One time password is required!'),
  body('otp')
    .isLength({ min: 6, max: 6 })
    .withMessage('A valid otp is required'),
]

// validates register endpoint
export const register = [
  body('firstName').notEmpty().withMessage('firstName is required!'),
  body('firstName')
    .isLength({ min: 3 })
    .withMessage('firstName should be atleast 3 characters'),
  body('firstName')
    .isLength({ max: 20 })
    .withMessage('firstName should be max 20 characters'),

  body('lastName').notEmpty().withMessage('lastName is required!'),
  body('lastName')
    .isLength({ min: 3 })
    .withMessage('lastName should be atleast 3 characters'),
  body('lastName')
    .isLength({ max: 20 })
    .withMessage('lastName should be max 20 characters'),

  body('email').notEmpty().withMessage('email is required!'),
  body('email').isEmail().withMessage('a valid email is required'),

  body('username').notEmpty().withMessage('username is required!'),
  body('username')
    .isLength({ min: 6 })
    .withMessage('username should be atleast 6 characters'),
  body('username')
    .isLength({ max: 20 })
    .withMessage('username should be max 20 characters'),

  body('password').notEmpty().withMessage('password is required!'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('password should be atleast 6  digits'),
  body('password')
    .isLength({ max: 20 })
    .withMessage('password should be max 50 digits'),
]

// validates profile Update
export const updateProfileDetails = [
  body('firstName').notEmpty().withMessage('firstName is required!'),
  body('firstName')
    .isLength({ min: 3 })
    .withMessage('firstName should be atleast 3 characters'),
  body('firstName')
    .isLength({ max: 20 })
    .withMessage('firstName should be max 20 characters'),

  body('lastName').notEmpty().withMessage('lastName is required!'),
  body('lastName')
    .isLength({ min: 3 })
    .withMessage('lastName should be atleast 3 characters'),
  body('lastName')
    .isLength({ max: 20 })
    .withMessage('lastName should be max 20 characters'),
]
export const updatePicture = [
  body('picture').notEmpty().withMessage('Picture is required!'),
]

export const resetPassword = [
  param('email').notEmpty().withMessage('Email is required!'),
  param('email').isEmail().withMessage('A valid email is required'),
]
