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
    console.log('video', video)
    console.log(video)
    if (!video)
      return helpers.common.errorHandler(res, 'Video not found', 404, null)
    video.likes = video.likes + 1
    video.save((err, doc) => {
      if (err) return helpers.common.errorHandler(res, null, null, err)
      helpers.common.successHandler(res, null, null, doc)
    })
  })
}
