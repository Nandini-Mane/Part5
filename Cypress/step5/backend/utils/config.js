require('dotenv').config()

const PORT = process.env.PORT || 3003
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1/blogApp'

module.exports = { PORT, MONGODB_URI }
