const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const morgan = require('morgan')
const blogRouter = require('./controllers/blogs')

mongoose.connect('mongodb://127.0.0.1:27017/bloglist')

const app = express()
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

app.use('/api/blogs', blogRouter)

app.listen(3003, () => {
  console.log('Server running on port 3003')
})
