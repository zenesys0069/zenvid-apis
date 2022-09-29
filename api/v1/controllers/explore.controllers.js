import models from '../../../mongodb/models/index.js'

export const username = (req, res) => {
  // get username from request payload
  const { username } = req.body
  models.User.findOne({ username }, (err, doc) => {
    if (err) {
      // there was an error while fetching data
      return res.status(400).json({
        status: false,
        message: 'There was some error, please try again',
      })
    }
    if (doc) {
      // the username is already exist
      return res.status(200).json({
        status: false,
        message: 'Username is already taken',
      })
    } else {
      // username is available to use
      return res.status(200).json({
        status: true,
        message: 'Username is available!',
      })
    }
  })
}
