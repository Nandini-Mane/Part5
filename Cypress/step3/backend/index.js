const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config()

const app = express()
app.use(cors())
app.use(express.json())

// connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/bloglist')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err.message))

// Schemas and models
const userSchema = new mongoose.Schema({
  username: String,
  name: String,
  passwordHash: String
})

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
})

const User = mongoose.model('User', userSchema)
const Blog = mongoose.model('Blog', blogSchema)

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

// Routes

// Register new user
app.post('/api/users', async (req, res) => {
  const { username, name, password } = req.body
  const passwordHash = await bcrypt.hash(password, 10)
  const user = new User({ username, name, passwordHash })
  const savedUser = await user.save()
  res.status(201).json(savedUser)
})

// Login
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body
  const user = await User.findOne({ username })

  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(password, user.passwordHash)

  if (!user || !passwordCorrect) {
    return res.status(401).json({ error: 'invalid username or password' })
  }

  const userForToken = {
    username: user.username,
    id: user._id
  }

  const token = jwt.sign(userForToken, 'SECRET')

  res.status(200).send({ token, username: user.username, name: user.name })
})

// Helper to get token
const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '')
  }
  return null
}

// Get all blogs
app.get('/api/blogs', async (req, res) => {
  const blogs = await Blog.find({})
  res.json(blogs)
})

// Create new blog (requires token)
app.post('/api/blogs', async (req, res) => {
  const body = req.body
  const token = getTokenFrom(req)

  let decodedToken
  try {
    decodedToken = jwt.verify(token, 'SECRET')
  } catch (error) {
    return res.status(401).json({ error: 'token invalid' })
  }

  if (!decodedToken.id) {
    return res.status(401).json({ error: 'token missing or invalid' })
  }

  const user = await User.findById(decodedToken.id)

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user._id
  })

  const savedBlog = await blog.save()
  res.status(201).json(savedBlog)
})

// ✅ Start server
const PORT = 3003
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
