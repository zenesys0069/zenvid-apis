import express from 'express'
import cors from 'cors'
import routes from './routers/index.mjs'
import mongodbInit from './configs/mongodb.mjs'
import Busboy from './middlewares/busboy.mjs'
import * as constants from './constants/index.mjs'
import JWT from 'jsonwebtoken'

// express app
const app = express()

// middleware
app.use(cors())
app.use(express.json())
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
app.get('/user/reset-password', (req, res) => {
  const { token } = req.query
  JWT.verify(token, process.env.JWT_SECRET_KEY, (error, decoded) => {
    if (error) return res.status(401).render('expired')
    res.status(200).render('reset')
  })
})

// spinning the server
app.listen(constants.PORT, () => {
  console.log(`Server is running at port ${constants.PORT}`)
})
