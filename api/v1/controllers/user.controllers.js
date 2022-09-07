import { generateToken } from '../../../utils/jwt.js'

export const register = (req, res) => {
  res.status(201).json(req.body)
}

export const login = (req, res) => {
  // get login payload
  const { name, email } = req.body
  // generate token
  const token = generateToken({
    name,
    email,
  })
  // check if token is generated successfully
  if (token) {
    // token generated successfully
    res.status(200).json({
      status: true,
      token,
      name,
      email,
    })
  } else {
    // there was an error while generating token
    res.status(500).json({
      status: false,
      message: 'An unknown error ocurred while logging you, please try again',
    })
  }
}

export const profile = (req, res) => {
  res.status(200).json(req.user)
}
