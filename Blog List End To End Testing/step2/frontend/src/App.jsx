import { useState } from "react"
import LoginForm from "./components/Loginform.jsx"

const App = () => {
  const [user, setUser] = useState(null)

  const handleLogin = async ({ username, password }) => {
    try {
      const response = await fetch("http://localhost:3003/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      })

      if (!response.ok) {
        throw new Error("Invalid credentials")
      }

      const data = await response.json()
      window.localStorage.setItem("loggedBlogUser", JSON.stringify(data))
      setUser(data)
    } catch (error) {
      alert("Login failed: " + error.message)
    }
  }

  if (user === null) {
    return (
      <div>
        <h2>Login to Blog App</h2>
        <LoginForm onLogin={handleLogin} />
      </div>
    )
  }

  return (
    <div>
      <h2>Welcome, {user.name}</h2>
      <p>You are logged in!</p>
    </div>
  )
}

export default App
