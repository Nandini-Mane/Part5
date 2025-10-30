import { useState } from 'react'
import axios from 'axios'

function App() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState(null)

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const response = await axios.post('http://localhost:3003/api/login', {
        username,
        password
      })
      setMessage(`${response.data.name} logged in`)
    } catch (error) {
      setMessage('wrong username or password')
    }
  }

  return (
    <div>
      <h2>Login</h2>
      {message && <div className="error">{message}</div>}

      <form onSubmit={handleLogin}>
        <div>
          Username <input name="Username" value={username} onChange={({target}) => setUsername(target.value)} />
        </div>
        <div>
          Password <input type="password" name="Password" value={password} onChange={({target}) => setPassword(target.value)} />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

export default App
