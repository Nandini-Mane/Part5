const blogsRouter = require('express').Router()

blogsRouter.get('/', (req, res) => {
  res.json([])
})

module.exports = blogsRouter
