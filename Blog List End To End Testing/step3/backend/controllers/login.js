const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()

// For now, use a static test user.
// Later, you’ll replace this with a real database query.
const testUser = {
  username: 'testuser',
  name: 'Test User',
  passwordHash: bcrypt.hashSync('secret', 10),
}

loginRouter.post('/', async (req, res) => {
  const { username, password } = req.body

  const passwordCorrect = username === testUser.username &&
    await bcrypt.compare(password, testUser.passwordHash)

  if (!passwordCorrect) {
    return res.status(401).json({ error: 'invalid username or password' })
  }

  const userForToken = {
    username: testUser.username,
    id: '12345',
  }

  const token = jwt.sign(userForToken, 'secretKey') // replace with process.env.SECRET in production

  res.status(200).send({
    token,
    username: testUser.username,
    name: testUser.name,
  })
})

module.exports = loginRouter
