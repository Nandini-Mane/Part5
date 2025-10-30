const resetRouter = require('express').Router()
const User = require('../models/user')

resetRouter.post('/', async (req, res) => {
  await User.deleteMany({})
  res.status(204).end()
})

module.exports = resetRouter
