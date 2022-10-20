import models from '../../../mongodb/models/index.mjs'
import * as constants from '../../../constants/index.mjs'
import helpers from '../../../helpers/index.mjs'

// upload watch / video controller
export const upload = (req, res) => {
  // save video path to the database in user account.
  //req.locales.watch contains uploaded video name
  const user = req.user
  const { title, description, watch } = req.locales
  if (!title) {
    return res.status(400).json({
      status: false,
      message: 'title is missing.',
    })
  }
  if (!description) {
    return res.status(400).json({
      status: false,
      message: 'description is missing.',
    })
  }

  new models.Watch({
    userId: user.id,
    username: user.username,
    title,
    description,
    watch: helpers.watch.getWatchFullPath(watch),
  }).save((err, result) => {
    if (err)
      return res.status(400).json({
        status: false,
        message: 'There was an error while uploading, please try again',
        result: err,
      })

    res.status(200).json({
      status: true,
      message: 'You video has been published',
      result: result,
    })
  })
}

export const getVideos = (req, res) => {
  const page = Number(req.params.page || 0) * 10
  models.Watch.find({}, {}, { skip: page, limit: 10 }, (err, docs) => {
    if (err)
      return res.status(400).json({
        status: false,
        message: 'Please try again',
      })
    return res.status(400).json({
      status: true,
      message: 'Successfully fetched',
      current_length: docs.length,
      is_next: docs.length === 10,
      host: helpers.common.getFullHost(req),
      data: docs,
    })
  })
}
