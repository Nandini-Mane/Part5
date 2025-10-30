import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import config from './utils/config.js'
import logger from './utils/logger.js'
import middleware from './utils/middleware.js'
import loginRouter from './controllers/login.js'
import resetRouter from './utils/reset.js'
import User from './models/user.js'

dotenv.config()

const app = express()

// --- Connect to MongoDB ---
logger.info('Connecting to', config.MONGODB_URI)

mongoose.set('strictQuery', false)
mongoose.connect(config.MONGODB_URI)
  .then(() => logger.info('Connected to MongoDB'))
  .catch(error => logger.error('Error connecting to MongoDB:', error.message))

// --- Middlewares ---
app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)

// --- Routes ---
app.get('/', (req, res) => {
  res.send('<h1>Blog List Backend Running</h1>')
})

// Login route
app.use('/api/login', loginRouter)

// For test environment: reset the database
if (process.env.NODE_ENV === 'test') {
  app.use('/api/testing', resetRouter)
}

// Example: Create user directly (for simplicity)
app.post('/api/users', async (req, res) => {
  const { username, password } = req.body

  if (!username || !password) {
    return res.status(400).json({ error: 'username and password required' })
  }

  const existingUser = await User.findOne({ username })
  if (existingUser) {
    return res.status(400).json({ error: 'username must be unique' })
  }

  const user = new User({ username, password })
  const savedUser = await user.save()
  res.status(201).json(savedUser)
})

// --- Error Handlers ---
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

// --- Start Server ---
const PORT = config.PORT
app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`)
})
