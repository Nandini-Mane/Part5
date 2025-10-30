import { useState, useEffect } from 'react'
import * as blogService from './services/blogs'
import loginService from './services/login'

function App() {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs => setBlogs(blogs))
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      setUser(user)
      blogService.setToken(user.token)
      setUsername('')
      setPassword('')
    } catch (exception) {
      alert('wrong credentials')
    }
  }

  const handleCreateBlog = async (event) => {
    event.preventDefault()
    const newBlog = await blogService.create({ title, author, url })
    setBlogs(blogs.concat(newBlog))
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  if (user === null) {
    return (
      <form onSubmit={handleLogin}>
        <h2>Login</h2>
        <div>
          username
          <input value={username} onChange={({ target }) => setUsername(target.value)} />
        </div>
        <div>
          password
          <input type="password" value={password} onChange={({ target }) => setPassword(target.value)} />
        </div>
        <button type="submit">login</button>
      </form>
    )
  }

  return (
    <div>
      <h2>Blogs</h2>
      <form onSubmit={handleCreateBlog}>
        <input placeholder='title' value={title} onChange={({ target }) => setTitle(target.value)} />
        <input placeholder='author' value={author} onChange={({ target }) => setAuthor(target.value)} />
        <input placeholder='url' value={url} onChange={({ target }) => setUrl(target.value)} />
        <button type='submit'>create</button>
      </form>
      <ul>
        {blogs.map(b => <li key={b.id}>{b.title}</li>)}
      </ul>
    </div>
  )
}

export default App
