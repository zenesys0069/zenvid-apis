import express from 'express'
import cors from 'cors'
import routes from './routers/index.mjs'
import mongodbInit from './configs/mongodb.mjs'
import Busboy from './middlewares/busboy.mjs'
import * as constants from './constants/index.mjs'

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

// server static files
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

// spinning the server
app.listen(constants.PORT, () => {
  console.log(`Server is running at port ${constants.PORT}`)
})
