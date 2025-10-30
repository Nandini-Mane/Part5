const express = require('express')
const Blog = require('../models/blog')
const blogRouter = express.Router()

// get all blogs
blogRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({})
  res.json(blogs)
})

// update likes
blogRouter.put('/:id', async (req, res) => {
  const { likes } = req.body
  const updatedBlog = await Blog.findByIdAndUpdate(
    req.params.id,
    { likes },
    { new: true, runValidators: true }
  )
  res.json(updatedBlog)
})

module.exports = blogRouter
