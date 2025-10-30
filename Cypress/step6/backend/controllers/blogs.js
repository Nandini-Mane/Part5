const blogsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')

const getTokenFrom = (request) => {
  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '')
  }
  return null
}

// GET all blogs
blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  res.json(blogs)
})

// POST create new blog
blogsRouter.post('/', async (req, res) => {
  const body = req.body
  const token = getTokenFrom(req)

  let decodedToken
  try {
    decodedToken = jwt.verify(token, process.env.SECRET || 'SECRET_KEY')
  } catch {
    return res.status(401).json({ error: 'token invalid or missing' })
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
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  res.status(201).json(savedBlog)
})

// PUT update likes
blogsRouter.put('/:id', async (req, res) => {
  const updated = await Blog.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  })
  res.json(updated)
})

// DELETE blog (only creator)
blogsRouter.delete('/:id', async (req, res) => {
  const token = getTokenFrom(req)

  let decodedToken
  try {
    decodedToken = jwt.verify(token, process.env.SECRET || 'SECRET_KEY')
  } catch {
    return res.status(401).json({ error: 'token invalid or missing' })
  }

  const blog = await Blog.findById(req.params.id)
  if (!blog) return res.status(404).json({ error: 'blog not found' })

  if (blog.user.toString() !== decodedToken.id) {
    return res.status(403).json({ error: 'not authorized to delete this blog' })
  }

  await Blog.findByIdAndDelete(req.params.id)
  res.status(204).end()
})

module.exports = blogsRouter
