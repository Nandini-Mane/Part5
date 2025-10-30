import dotenv from 'dotenv'

dotenv.config()

const PORT = process.env.PORT || 3003
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1/bloglist'
const SECRET = process.env.SECRET || 'secret'

export default {
  MONGODB_URI,
  PORT,
  SECRET,
}
