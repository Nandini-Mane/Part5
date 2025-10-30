require('dotenv').config()

const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')

// 2. IMPORT ROUTERS
const blogsRouter = require('./controllers/blogs') 
const loginRouter = require('./controllers/login')

// 3. DATABASE CONNECTION
logger.info('connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connecting to MongoDB:', error.message)
  })

// 4. GLOBAL MIDDLEWARE SETUP
app.use(cors())
app.use(express.static('build')) // For serving frontend static files (if applicable)
app.use(express.json()) // Essential for parsing POST/PUT requests with JSON body
app.use(middleware.requestLogger) // Custom middleware for logging requests

// 5. ROUTE DEFINITIONS (THE LIKELY SPOT OF THE PREVIOUS ERROR)
// Ensure blogsRouter and loginRouter are valid Express router objects.
// If your controller exports were wrapped (e.g., { blogsRouter }),
// you'd need to change the import above.

// The line around 25 where the error likely occurred is replaced here:
app.use('/api/blogs', blogsRouter) // This line should now work
app.use('/api/login', loginRouter)

// 6. ERROR HANDLING MIDDLEWARE (MUST BE LAST)
// The userExtractor middleware should be added to the blogsRouter itself,
// but the tokenExtractor is sometimes used globally if needed by other routes.
app.use(middleware.unknownEndpoint) 
app.use(middleware.errorHandler) 

// 7. START SERVER (or export app to be run in a separate file)
const server = app.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`)
})

// Export app and server for testing or external use if needed
module.exports = app