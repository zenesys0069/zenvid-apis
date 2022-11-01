import helpers from '../../../helpers/index.mjs'
import models from '../../../mongodb/models/index.mjs'

export const username = (req, res) => {
  // get username from request payload
  const { username } = req.body
  models.User.findOne({ username }, (err, doc) => {
    if (err)
      // there was an error while fetching data
      return helpers.common.errorHandler(res, null, null, err)

    if (doc) {
      // the username is already exist
      helpers.common.errorHandler(res, 400, 'Username is already taken', null)
    } else {
      // username is available to use
      helpers.common.successHandler(res, null, 'Username is available!', null)
    }
  })
}

// find users by username, email, name
export const findUser = (req, res) => {
  // get search from payload
  const { search } = req.body
  models.User.find({ $text: { $search: search } }).exec((err, docs) => {
    if (err) return helpers.common.errorHandler(res, null, null, err)
    helpers.common.successHandler(res, null, null, {
      host: helpers.common.getFullHost(req),
      users: docs,
    })
  })
}
