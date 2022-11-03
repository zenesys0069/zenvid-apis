import models from '../../../mongodb/models/index.mjs'
import helpers from '../../../helpers/index.mjs'

export const start = (req, res) => {
  const { username } = req.body
  // get current logged in user
  models.User.findOne({ email: req.user.email }, (err, follower) => {
    if (err) return helpers.common.errorHandler(res, null, null, err)
    if (!follower)
      return helpers.common.errorHandler(res, null, 'User not found', null)
    // get user whom to follow
    models.User.findOne({ username }, (err, user) => {
      if (err) return helpers.common.errorHandler(res, null, null, err)
      if (!user)
        return helpers.common.errorHandler(res, null, 'User not found', err)
      models.User.findOneAndUpdate(
        { username },
        {
          followers: [
            ...user.followers,
            {
              firstName: follower.firstName,
              lastName: follower.lastName,
              username: follower.username,
              picture: follower.picture,
            },
          ],
        },
        (err, _) => {
          if (err) return helpers.common.errorHandler(res, null, null, err)
          models.User.findOneAndUpdate(
            { email: req.user.email },
            {
              followings: [
                ...follower.followings,
                {
                  firstName: user.firstName,
                  lastName: user.lastName,
                  username: user.username,
                  picture: user.picture,
                },
              ],
            },
            (err, doc) => {
              if (err) return helpers.common.errorHandler(res, null, null, err)
              helpers.common.successHandler(res, null, null, null)
            }
          )
        }
      )
    })
  })
}
export const stop = (req, res) => {
  res.status(200).json({
    message: 'Stopped following',
  })
}

export const followers = (req, res) => {
  res.status(200).json({
    message: 'Followers list',
  })
}
export const following = (req, res) => {
  res.status(200).json({
    message: 'Following list',
  })
}
