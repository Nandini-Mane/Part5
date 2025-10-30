// frontend/src/App.jsx (relevant snippet)

import React, { useState, useEffect } from 'react'
// Import the service
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [user, setUser] = useState(null)
  // ... other state definitions

  // Check for logged-in user on component mount (for persistent login)
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      // ⚠️ POTENTIAL ERROR SPOT 1: You must call setToken here!
      blogService.setToken(user.token) 
    }
  }, [])

  // Handler for login form submission
  const handleLogin = async (credentials) => {
    try {
      const user = await loginService.login(credentials)
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      // ⚠️ POTENTIAL ERROR SPOT 2: You must call setToken after successful login!
      blogService.setToken(user.token) 
      setUser(user)
      // ... rest of login success logic
    } catch (exception) {
      // ... handle login error
    }
  }

  // ... handler for creating a new blog
  const handleCreateBlog = async (blogObject) => {
    try {
      // The call to blogService.create is made here!
      const returnedBlog = await blogService.create(blogObject) 
      // ... success logic
    } catch (error) {
      // This catch is where you see the "AxiosError" and display the generic message.
      console.error('❌ Error creating blog:', error)
      // ... logic to show the "Failed to create blog" message to the user
    }
  }

  // ... rest of App component
}

export default App