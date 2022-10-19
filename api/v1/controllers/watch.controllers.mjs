import models from '../../../mongodb/models/index.mjs'
import * as constants from '../../../constants/index.mjs'

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
    watch: `${constants.STATIC_WATCH}/${watch}`,
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
  const page = Number(req.params.page)
  let skip = 0
  if (page < 2) {
    skip = 0
  } else {
    skip = page * 10
  }
  console.log()
  models.Watch.find({}, {}, { skip: skip, limit: 10 }, (err, docs) => {
    if (err)
      return res.status(400).json({
        status: false,
        message: 'Please try again',
      })
    return res.status(400).json({
      status: true,
      message: 'Successfully fetched',
      current_length: docs.length,
      is_last_page: docs.length < 10,
      host: `${req.protocol}://${req.get('host')}`,
      data: docs,
    })
  })
}
