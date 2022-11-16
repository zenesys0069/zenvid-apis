import models from '../../../mongodb/models/index.mjs'
import * as constants from '../../../constants/index.mjs'
import helpers from '../../../helpers/index.mjs'

// upload watch / video controller
export const upload = (req, res) => {
  // save video path to the database in user account.
  //req.locales.watch contains uploaded video name
  const user = req.user
  const { title, description, watch } = req.locales
  if (!title) return helpers.common.errorHandler(res, 400, 'title is missing.')

  if (!description)
    return helpers.common.errorHandler(res, 400, 'description is missing.')

  new models.Watch({
    userId: user.id,
    username: user.username,
    title,
    description,
    watch: helpers.watch.getWatchFullPath(watch),
  }).save((err, result) => {
    if (err) return helpers.common.errorHandler(res, null, null, err)

    helpers.common.successHandler(
      res,
      null,
      'You video has been published',
      result
    )
  })
}

export const getVideos = (req, res) => {
  const page = Number(req.params.page || 0) * 10
  models.Watch.find({}, {}, { skip: page, limit: 10 }, (err, docs) => {
    if (err) return helpers.common.errorHandler(res, null, null, err)
    return helpers.common.successHandler(res, null, null, {
      host: helpers.common.getFullHost(req),
      videos: docs,
    })
  })
}

export const like = (req, res) => {
  const { video_id } = req.body
  models.Watch.findById(video_id, (err, video) => {
    if (err) return helpers.common.errorHandler(res, null, null, err)
    if (!video)
      return helpers.common.errorHandler(res, 'Video not found', 404, null)
    // 1 check if user already liked this video
    // 2 if liked do unlike
    // 3 if not liked like this video

    // 1.
    models.User.findOne({ email: req.user.email }, (err, user) => {
      if (err) return helpers.common.errorHandler(res, null, null, err)
      if (!user)
        return helpers.common.errorHandler(res, 'user not found', 404, null)
      const isExist = user.liked.find((v) => {
        const userVideoID = v._id.toString()
        const videID = video._id.toString()
        return userVideoID === videID
      })
      if (isExist) {
        // user already liked this video
        // take unlike action
        const filteredVideo = user.liked.filter((v) => {
          const userVideoID = v._id.toString()
          const videoID = video._id.toString()
          return userVideoID !== videoID
        })

        user.liked = filteredVideo
        user.save((err, savedDoc) => {
          if (err) return helpers.common.errorHandler(res, null, null, err)
          video.likes = video.likes - 1
          video.save((err, unlikeDoc) => {
            if (err) return helpers.common.errorHandler(res, null, null, err)
            helpers.common.successHandler(res, null, null, unlikeDoc)
          })
        })
      } else {
        // user is not liked  this video yet
        // take further action to like this video
        user.liked = [video, ...user.liked]
        user.save((err, savedDoc) => {
          if (err) return helpers.common.errorHandler(res, null, null, err)
          video.likes = video.likes + 1
          video.save((err, likeDoc) => {
            if (err) return helpers.common.errorHandler(res, null, null, err)
            helpers.common.successHandler(res, null, null, likeDoc)
          })
        })
      }
    })
  })
}

export const postComment = (req, res) => {
  const { video_id, comment } = req.body
  models.Watch.findOne({ _id: video_id }, (err, video) => {
    if (err) return helpers.common.errorHandler(res, null, null, err)
    if (!video)
      return helpers.common.errorHandler(res, null, 'Video not found!', null)
    models.User.findOne({ _id: req.user.id }, (err, user) => {
      if (err) return helpers.common.errorHandler(res, null, null, err)
      if (!user)
        return helpers.common.errorHandler(res, 404, 'User not found', user)
      console.log({
        videoID: video_id,
        comment: comment,
        fullName: `${req.user.firstName} ${req.user.lastName}`,
        username: req.user.username,
        picture: user.picture,
      })
      new models.Comment({
        videoID: video_id,
        comment: comment,
        fullName: `${req.user.firstName} ${req.user.lastName}`,
        username: req.user.username,
        picture: user.picture,
      }).save((err, result) => {
        if (err) return helpers.common.errorHandler(res, null, null, err)
        helpers.common.successHandler(res, null, null, result)
      })
    })
  })
}

export const getComment = (req, res) => {
  const { video_id } = req.body
  models.Comment.find({ videoID: video_id }, (err, docs) => {
    if (err) return helpers.common.errorHandler(res, null, null, err)
    helpers.common.successHandler(res, null, null, docs)
  })
}
