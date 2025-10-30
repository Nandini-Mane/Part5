import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  return (
    <div>
      <h2>Login</h2>
      <form>
        <div>
          Username <input name="Username" />
        </div>
        <div>
          Password <input name="Password" type="password" />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

export default App
