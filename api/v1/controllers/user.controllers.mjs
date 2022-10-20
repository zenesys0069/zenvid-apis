import models from '../../../mongodb/models/index.mjs'
import { generateToken } from '../../../utils/jwt.mjs'
import bcrypt from 'bcrypt'
import Otp from '../../../mongodb/models/otp.model.mjs'
import helpers from '../../../helpers/index.mjs'
import moment from 'moment'
import JWT from 'jsonwebtoken'

export const otp = (req, res) => {
  // get email from payload
  const { email } = req.body
  const otp = helpers.user.generateOtp()

  // check if email is already exist
  Otp.findOne({ email }, (err, foundDoc) => {
    // there was an error while finding the doc
    if (err) {
      return helpers.common.errorHandler(res, null, null, err)
    }
    if (foundDoc) {
      // email found update the otp
      Otp.updateOne(
        { email },
        {
          otp: otp,
          expireAt: moment(new Date()).add(5, 'm').toDate(),
        },
        (err, docs) => {
          if (err) {
            // error while updating otp
            helpers.common.errorHandler(res, null, null, err)
          }
          // otp updated successfully
          helpers.mail
            .sendOneTimePassword(email, 'One Time Password', otp)
            .then((mailRes) => {
              helpers.common.successHandler(res, null, null, mailRes)
            })
            .catch((mailError) => {
              helpers.common.errorHandler(res, null, null, mailError)
            })
        }
      )
    } else {
      // email not found create new entry with new otp
      new Otp({
        email: email,
        otp: otp,
      })
        .save()
        .then((_) => {
          // otp generated successfully
          helpers.mail
            .sendOneTimePassword(email, 'One Time Password', otp)
            .then((mailRes) => {
              return helpers.common.successHandler(res, null, null, mailRes)
            })
            .catch((mailError) => {
              return helpers.common.errorHandler(res, null, null, mailError)
            })
        })
        .catch((err) => {
          // unable to generate otp
          return helpers.common.errorHandler(res, null, null, err)
        })
    }
  })
}

// verify otp
export const verifyOtp = (req, res) => {
  //get email and otp from payload
  const { otp, email } = req.body

  //retrieve otp against email provided
  Otp.findOne({ email }, (err, docs) => {
    if (err) {
      // an error occur while fetching data
      return helpers.common.errorHandler(res, null, null, err)
    }
    if (docs) {
      // an otp with this email is associated, now verify if both otp matches
      if (docs.otp == otp) {
        // one time password matched
        helpers.common.successHandler(
          res,
          null,
          'One time password has been verified!'
        )
      } else {
        // incorrect one time password
        helpers.common.errorHandler(res, 400, 'Incorrect one time password!')
      }
    } else {
      // there is no record found or one time password has been expired.
      helpers.common.errorHandler(
        res,
        400,
        'One time password has been expired!'
      )
    }
  })
}

export const register = (req, res) => {
  // destructure all payloads from req.body
  const { firstName, lastName, phone, email, username, password, role } =
    req.body

  let picture
  // check image provide on signup or not
  const { picture: Picture } = res.locals

  if (Picture.status) {
    // image was provide and uploaded
    // now we can access path and store it in db
    picture = Picture.path
  }

  // create new user in the database
  new models.User({
    firstName,
    lastName,
    phone,
    email,
    username,
    cipher: bcrypt.hashSync(password, 10),
    role,
    picture: helpers.user.getPictureFullPath(picture),
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
        id: foundUser._id,
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
  // user token verified
  // can be access req.user
  // find user details in db
  models.User.findById(req.user.id, (err, docs) => {
    if (err)
      return res.status(400).json({
        status: false,
        message: 'There was an error, please try again',
        error: err,
      })

    if (!docs) {
      // user not found
      return res.status(400).json({
        status: false,
        message: 'There was an error, please try again',
        result: docs,
      })
    }
    const user = {
      id: docs._id,
      firstName: docs.firstName,
      lastName: docs.lastName,
      fullName: `${docs.firstName} ${docs.lastName}`,
      email: docs.email,
      username: docs.username,
      phone: docs.phone,
      role: docs.role,
      host: helpers.common.getFullHost(req),
      picture: docs.picture,
    }

    res.status(200).json({
      status: true,
      message: 'Request completed successfully',
      result: user,
    })
  })
}

export const updateProfileDetails = (req, res) => {
  // destructure all payloads from req.body
  const { firstName, lastName, phone } = req.body

  let picture
  // check image provide on signup or not
  const { picture: Picture } = res.locals

  if (Picture.status) {
    // image was provide and uploaded
    // now we can access path and store it in db
    picture = Picture.path
  }
  models.User.findOneAndUpdate(
    {
      email: req.user.email,
    },
    {
      firstName,
      lastName,
      phone,
      picture: helpers.user.getPictureFullPath(picture),
    },
    (error, doc) => {
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
        message: 'Your account has been successfully updated!',
        result: {},
      })
    }
  )
}

export const updatePicture = (req, res) => {
  // get picture path from middleware
  const { picture } = res.locals
  // update user picture
  models.User.findOneAndUpdate(
    { email: req.user.email },
    {
      picture: helpers.user.getPictureFullPath(picture.path),
    },
    (error, result) => {
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
        message: 'Your account has been successfully updated!',
        result: {},
      })
    }
  )
}

// reset password controller
export const resetPassword = (req, res) => {
  const { email } = req.params
  models.User.findOne({ email: email }, (err, foundUser) => {
    if (err)
      return res.status(400).json({
        status: false,
        message: 'There was an error, please try again',
      })
    if (!foundUser) {
      return res.status(200).json({
        status: true,
        message:
          'If you are registered with us an email address will be sent to you.',
      })
    }

    const host = helpers.common.getFullHost(req)
    const payload = {
      id: foundUser._id,
      email: foundUser.email,
    }
    const resetToken = JWT.sign(payload, process.env.JWT_SECRET_KEY, {
      expiresIn: '5m',
    })
    const resetLink = `${host}/user/password/reset?token=${resetToken}`

    helpers.mail
      .sendResetPassword(email, resetLink)
      .then((emailRes) => {
        res.status(200).json({
          status: true,
          message:
            'If you are registered with us an email address will be sent to you.',
          result: emailRes,
        })
      })
      .catch((emailErr) => {
        res.status(200).json({
          status: false,
          message: 'There was an error please try again.',
          result: emailErr,
        })
      })
  })
}
