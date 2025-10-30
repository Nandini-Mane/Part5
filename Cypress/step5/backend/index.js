require('dotenv').config()
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const app = express()
app.use(cors())
app.use(express.json())

// 🔹 Connect to MongoDB
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/blogApp'
mongoose
  .connect(MONGODB_URI)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch((err) => console.error('❌ MongoDB connection error:', err))

// 🔹 Define Schemas and Models
const userSchema = new mongoose.Schema({
  username: String,
  name: String,
  passwordHash: String,
})

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
})

// 🔹 Transform output (replace _id with id)
blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

const User = mongoose.model('User', userSchema)
const Blog = mongoose.model('Blog', blogSchema)

// 🔹 Middleware for token extraction
const getTokenFrom = (request) => {
  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '')
  }
  return null
}

// 🔹 Default route
app.get('/', (req, res) => {
  res.send('🚀 Blog backend is running!')
})

// 🔹 Setup route to create default test user
app.get('/api/setup', async (req, res) => {
  const existingUser = await User.findOne({ username: 'testuser' })
  if (existingUser) {
    return res.status(200).json({ message: 'User already exists' })
  }

  const passwordHash = await bcrypt.hash('password', 10)
  const user = new User({
    username: 'testuser',
    name: 'Test User',
    passwordHash,
  })
  await user.save()

  res
    .status(201)
    .json({ message: '✅ User testuser created with password "password"' })
})

// 🔹 Login route
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body
  const user = await User.findOne({ username })

  const passwordCorrect =
    user === null ? false : await bcrypt.compare(password, user.passwordHash)

  if (!(user && passwordCorrect)) {
    return res.status(401).json({ error: 'invalid username or password' })
  }

  const userForToken = {
    username: user.username,
    id: user._id,
  }

  const token = jwt.sign(userForToken, process.env.SECRET || 'SECRET_KEY')

  res.status(200).send({
    token,
    username: user.username,
    name: user.name,
  })
})

// 🔹 Get all blogs
app.get('/api/blogs', async (req, res) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  res.json(blogs)
})

// 🔹 Create a new blog
app.post('/api/blogs', async (req, res) => {
  const body = req.body
  const token = getTokenFrom(req)
  let decodedToken = {}

  try {
    decodedToken = jwt.verify(token, process.env.SECRET || 'SECRET_KEY')
  } catch (err) {
    return res.status(401).json({ error: 'token invalid or missing' })
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
    user: user._id,
  })

  const savedBlog = await blog.save()
  res.status(201).json(savedBlog)
})

// 🔹 Update blog likes
app.put('/api/blogs/:id', async (req, res) => {
  const { id } = req.params
  const { likes } = req.body

  const updatedBlog = await Blog.findByIdAndUpdate(
    id,
    { likes },
    { new: true, runValidators: true, context: 'query' }
  )

  if (updatedBlog) {
    res.json(updatedBlog)
  } else {
    res.status(404).end()
  }
})

// 🔹 Delete blog (ONLY creator can delete)
app.delete('/api/blogs/:id', async (req, res) => {
  const token = getTokenFrom(req)
  let decodedToken = {}

  try {
    decodedToken = jwt.verify(token, process.env.SECRET || 'SECRET_KEY')
  } catch (err) {
    return res.status(401).json({ error: 'token invalid or missing' })
  }

  if (!decodedToken.id) {
    return res.status(401).json({ error: 'token missing or invalid' })
  }

  const blog = await Blog.findById(req.params.id)
  if (!blog) {
    return res.status(404).json({ error: 'blog not found' })
  }

  // ❗ Check if the logged-in user is the blog owner
  if (blog.user.toString() !== decodedToken.id.toString()) {
    return res.status(401).json({ error: 'only the creator can delete this blog' })
  }

  await Blog.findByIdAndDelete(req.params.id)
  res.status(204).end()
})

// 🔹 Start the server
const PORT = 3003
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`)
})
