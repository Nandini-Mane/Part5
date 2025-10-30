import React, { useState } from 'react'
import LoginForm from './components/LoginForm'

const App = () => {
  const [user, setUser] = useState(null)

  const handleLogin = (username, password) => {
    if (username === 'testuser' && password === 'password') {
      setUser({ username })
    } else {
      alert('Invalid credentials')
    }
  }
  if (!user) {
    return (
      <div>
        <h2>Log in to application</h2>
        <LoginForm onLogin={handleLogin} />
      </div>
    )
  }
  return (
    <div>
      <h2>Blogs</h2>
      <p>Welcome, {user.username}!</p>
      <ul>
        <li>Understanding React Hooks</li>
        <li>Mastering Playwright Testing</li>
        <li>Node.js Tips & Tricks</li>
      </ul>
    </div>
  )
}
export default App
