import express from 'express'
import cors from 'cors'
import routes from './routers/index.js'
import mongodbInit from './configs/mongodb.js'
import Busboy from './middlewares/busboy.js'

// express app
const app = express()

// port
const PORT = process.env.PORT || 4000
const API_PREFIX = '/api/v1'

// middleware
app.use(cors())
app.use(express.json())
app.use(
  Busboy({
    highWaterMark: 2 * 1024 * 1024, // Set 2MiB buffer
  })
) // Insert the busboy middle-ware

// server static files
// TODO

// routes
Object.entries(routes).map(([name, router]) => {
  app.use(`${API_PREFIX}/${name}`, router)
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
app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`)
})
