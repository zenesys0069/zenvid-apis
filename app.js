import express from 'express'
import cors from 'cors'
import routes from './routers/index.js'

// express app
const app = express()

// port
const PORT = process.env.PORT || 4000
const API_PREFIX = '/api/v1'

// middleware
app.use(cors())
app.use(express.json())

// server static files

// routes
Object.entries(routes).map(([name, router]) => {
  app.use(`${API_PREFIX}/${name}`, router)
})

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
