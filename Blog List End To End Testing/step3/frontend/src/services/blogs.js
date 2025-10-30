// frontend/src/services/blogs.js

import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null // <-- This variable HOLDS the authentication token

// Function to set the token received after a successful login
const setToken = newToken => {
  // CORRECT: Tokens must be prefixed with 'Bearer ' for standard JWT authorization
  token = `Bearer ${newToken}`
}

// Function to get all blogs (might not need a token if it's a public read)
const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

// **WHERE THE ERROR LIKELY IS:** The 'create' function needs the token
const create = async newObject => {
  // ❌ WRONG/MISSING IMPLEMENTATION: Not passing the token config
  // const response = await axios.post(baseUrl, newObject)
  // return response.data

  // ✅ CORRECT IMPLEMENTATION: Defining the config object with the Authorization header
  const config = {
    headers: {
      Authorization: token, // <-- THIS LINE is essential for authentication
    },
  }

  // Sending the request with the new object AND the config object
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

// Ensure you export the setToken function
export default { getAll, create, setToken }