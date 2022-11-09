import models from '../../../mongodb/models/index.mjs'
import helpers from '../../../helpers/index.mjs'

export const start = (req, res) => {
  const { username } = req.body
  if (username === req.user.username)
    return helpers.common.errorHandler(res, 400, 'You cannot follow self', null)
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

      // check user is already following
      const isFollow = user.followers.find(
        (follower) => follower.username === req.user.username
      )

      if (!isFollow) {
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
                if (err)
                  return helpers.common.errorHandler(res, null, null, err)
                helpers.common.successHandler(res, null, null, null)
              }
            )
          }
        )
      } else {
        helpers.common.errorHandler(
          res,
          400,
          'You already following this user',
          null
        )
      }
    })
  })
}
export const stop = (req, res) => {
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
      const followers = user.followers.filter((f) => f.username !== username)
      models.User.findOneAndUpdate(
        { username },
        {
          followers: followers,
        },
        (err, _) => {
          if (err) return helpers.common.errorHandler(res, null, null, err)
          const followings = follower.followings.filter(
            (f) => f.username !== username
          )
          models.User.findOneAndUpdate(
            { email: req.user.email },
            {
              followings: followings,
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

export const followers = (req, res) => {
  const { email } = req.user
  models.User.findOne({ email }, (err, doc) => {
    if (err) return helpers.common.errorHandler(res, null, null, err)
    if (!doc)
      return helpers.common.errorHandler(res, null, 'User not found', null)
    helpers.common.successHandler(res, null, null, doc.followers)
  })
}
export const followings = (req, res) => {
  const { email } = req.user
  models.User.findOne({ email }, (err, doc) => {
    if (err) return helpers.common.errorHandler(res, null, null, err)
    if (!doc)
      return helpers.common.errorHandler(res, null, 'User not found', null)
    helpers.common.successHandler(res, null, null, doc.followings)
  })
}
