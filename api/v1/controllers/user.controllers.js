import models from '../../../mongodb/models/index.js'
import { generateToken } from '../../../utils/jwt.js'
import bcrypt from 'bcrypt'
import Otp from '../../../mongodb/models/otp.model.js'
import helpers from '../../../helpers/index.js'

export const otp = (req, res) => {
  // get email from payload
  const { email } = req.body

  // check if email is already exist
  Otp.findOne({ email }, (err, foundDoc) => {
    // there was an error while finding the doc
    if (err) {
      return res.status(400).json({
        status: false,
        message: 'There was an error',
        error: err,
      })
    }
    if (foundDoc) {
      // email found update the otp
      Otp.updateOne(
        { email },
        {
          otp: helpers.user.generateOtp(),
          expireAt: new Date(),
        },
        (err, docs) => {
          if (err) {
            // error while updating otp
            return res.status(400).json({
              status: false,
              message: 'Unable to send otp',
              error: err,
            })
          }
          // otp updated successfully

          helpers.mail
            .sendOneTimePassword(
              email,
              'One Time Password',
              helpers.user.generateOtp()
            )
            .then((mailRes) => {
              return res.status(200).json({
                status: true,
                message: 'OTP resend successfully',
                result: mailRes,
              })
            })
            .catch((mailError) => {
              return res.status(400).json({
                status: false,
                message: 'Unable to send otp',
                error: mailError,
              })
            })
        }
      )
    } else {
      // email not found create new entry with new otp
      new Otp({
        email: email,
        otp: helpers.user.generateOtp(),
      })
        .save()
        .then((_) => {
          // otp generated successfully
          helpers.mail
            .sendOneTimePassword(
              email,
              'One Time Password',
              helpers.user.generateOtp()
            )
            .then((mailRes) => {
              return res.status(200).json({
                status: true,
                message: 'OTP sent successfully',
                result: mailRes,
              })
            })
            .catch((mailError) => {
              return res.status(400).json({
                status: false,
                message: 'Unable to send otp',
                error: mailError,
              })
            })
        })
        .catch((err) => {
          // unable to generate otp
          res.status(400).json({
            status: false,
            message: 'Unable to generate otp',
            error: err,
          })
        })
    }
  })
}

export const register = (req, res) => {
  // destructure all payloads from req.body
  const {
    firstName,
    lastName,
    phone,
    email,
    username,
    password,
    role,
    picture,
  } = req.body
  // create new user in the database
  new models.User({
    firstName,
    lastName,
    phone,
    email,
    username,
    cipher: bcrypt.hashSync(password, 10),
    role,
    picture,
  }).save((error, result) => {
    // check if there is any error while create user in the database
    if (error) {
      return res.status(500).json({
        status: false,
        message:
          'There was an error while create your account, please try again',
        error,
      })
    }
    // user successfully create in the database
    res.status(200).json({
      status: true,
      message: 'Your account has been successfully created, please login now!',
    })
  })
}

export const login = (req, res) => {
  // get login payload
  const { email, password } = req.body
  // check if request email is exist in our database or not
  models.User.findOne({ email }, (error, foundUser) => {
    // check if there is any error with query
    if (error)
      return res.status(400).json({
        status: false,
        message: 'There was an error, please try again',
      })
    if (!foundUser)
      return res.status(404).json({
        status: false,
        message: 'There is no any account associated with this email',
      })

    // user found successfully, please check for password
    bcrypt.compare(password, foundUser.cipher).then((result) => {
      // result = true , password is correct.
      // result = false, password is incorrect
      if (!result)
        return res.status(400).json({
          status: false,
          message: 'Either email or password is incorrect',
        })
      // generate token
      const payload = {
        firstName: foundUser.firstName,
        lastName: foundUser.lastName,
        email: foundUser.email,
        username: foundUser.username,
        phone: foundUser.phone,
        role: 'user',
      }
      const token = generateToken(payload) // check if token is generated successfully
      if (token) {
        // token generated successfully
        res.status(200).json({
          status: true,
          token,
          ...payload,
        })
      } else {
        // there was an error while generating token
        res.status(500).json({
          status: false,
          message:
            'An unknown error ocurred while logging you, please try again',
        })
      }
    })
  })
}

export const profile = (req, res) => {
  res.status(200).json(req.user)
}
