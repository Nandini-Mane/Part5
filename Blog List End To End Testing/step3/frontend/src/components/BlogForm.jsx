import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    createBlog({ title, author, url })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>create new</h2>
      <div>
        title: <input id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
      </div>
      <div>
        author: <input id="author" value={author} onChange={(e) => setAuthor(e.target.value)} />
      </div>
      <div>
        url: <input id="url" value={url} onChange={(e) => setUrl(e.target.value)} />
      </div>
      <button id="create-button" type="submit">create</button>
    </form>
  )
}

export default BlogForm
