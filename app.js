import express from 'express'
import cors from 'cors'
import userRouter from './api/v1/routes/user.routes.js'

// express app
const app = express()

// port
const PORT = process.env.PORT || 4000

// middleware
app.use(cors())
app.use(express.json())

// server static files

// routes
app.use('/api/v1/user', userRouter)

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
