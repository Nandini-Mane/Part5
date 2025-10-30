// backend/utils/middleware.js (Token Extractor)

const jwt = require('jsonwebtoken')
// ... other imports and utility functions

const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization')
  
  // ⚠️ POTENTIAL ERROR SPOT 3: Logic to check for the token's presence and format
  if (authorization && authorization.startsWith('Bearer ')) {
    // CORRECT: Extract the token by removing 'Bearer ' (length 7)
    request.token = authorization.replace('Bearer ', '')
  } else {
    // ❌ WRONG (for a required token route): Allowing the request to continue
    // next()
    
    // ✅ CORRECT (for a required token route): Setting token to null and continuing
    request.token = null
  }
  
  next()
}

// Middleware that verifies the token and finds the user
const userExtractor = (request, response, next) => {
  // Assuming tokenExtractor ran first and set request.token
  if (request.token) {
    try {
      // Decode the token using the secret (from config.js)
      const decodedToken = jwt.verify(request.token, process.env.SECRET)
      
      if (!decodedToken.id) {
        return response.status(401).json({ error: 'token invalid' })
      }
      
      // Look up the user by the ID in the token payload
      // In a real app, you'd fetch the user from the database here
      request.user = { id: decodedToken.id } // Placeholder user object

    } catch (error) {
      // ❌ CATCH: If token is expired or has wrong signature, this catch block runs
      return response.status(401).json({ error: 'token invalid or expired' })
    }
  } else {
    // ❌ CATCH: If request.token was null (i.e., no token was sent)
    return response.status(401).json({ error: 'token missing' }) // <-- THIS IS LIKELY THE CAUSE OF YOUR 401
  }
  
  next()
}

module.exports = {
  tokenExtractor,
  userExtractor,
  // ... other middleware
}