import express from 'express'
import cors from 'cors'
import routes from './routers/index.mjs'
import mongodbInit from './configs/mongodb.mjs'
import Busboy from './middlewares/busboy.mjs'
import * as constants from './constants/index.mjs'
import JWT from 'jsonwebtoken'
import models from './mongodb/models/index.mjs'
import bcrypt from 'bcrypt'

// express app
const app = express()

// middleware
app.use(cors())
app.use(
  express.json({
    limit: '50mb',
  })
)
app.use(express.urlencoded({ extended: true, limit: '50mb' }))
app.use(
  Busboy({
    highWaterMark: 2 * 1024 * 1024, // Set 2MiB buffer
  })
) // Insert the busboy middle-ware

// ejs
app.set('view engine', 'ejs')

// server static files
app.use(express.static('public'))
app.use(constants.STATIC_AVATAR, express.static('avatars')) // serve profile pic
app.use(constants.STATIC_WATCH, express.static('watch')) // serve reels/videos

// routes
Object.entries(routes).map(([name, router]) => {
  app.use(`${constants.API_PREFIX}/${name}`, router)
})

// connecting app to mongodb database
mongodbInit()
  .then((res) => console.log('Connected to local mongodb database'))
  .catch((err) =>
    console.log(
      'There was an error while connecting to the mongodb database',
      err
    )
  )

// root route
app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Server is up and running, Cheers!',
  })
})

// reset password
app.get('/user/password/reset', (req, res) => {
  const { token } = req.query
  if (token) {
    JWT.verify(token, process.env.JWT_SECRET_KEY, (error, _) => {
      if (error) return res.status(401).render('expired')
      res.status(200).render('reset')
    })
  } else {
    res.status(400).render('notFound')
  }
})
app.post('/user/password/reset', (req, res) => {
  const { password, confirm_password, token } = req.body
  if (password === confirm_password) {
    JWT.verify(token, process.env.JWT_SECRET_KEY, (error, decoded) => {
      if (error) return res.status(401).render('expired')
      models.User.findOneAndUpdate(
        { email: decoded.email },
        { cipher: bcrypt.hashSync(confirm_password, 10) },
        (err, doc) => {
          if (err) {
            res.status(400).render('error')
          } else {
            res.status(200).render('success')
          }
        }
      )
    })
  } else res.render('reset')
})

// spinning the server
const listener = app.listen(constants.PORT, () => {
  console.log(`Server is running at port ${constants.PORT}`)
})
global.listener = listener
