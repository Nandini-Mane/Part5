import { useState, useEffect } from 'react'
import blogsService from './services/blogs'
import BlogForm from './components/BlogForm'
import Blog from './components/Blog'

function App() {
  const [blogs, setBlogs] = useState([])

  useEffect(() => {
    blogsService.getAll().then((data) => setBlogs(data))
  }, [])

  const createBlog = async (blogObject) => {
    const newBlog = await blogsService.create(blogObject)
    setBlogs(blogs.concat(newBlog))
  }

  const likeBlog = async (blog) => {
  const updatedBlog = { ...blog, likes: blog.likes + 1 }

  const returnedBlog = await blogsService.update(blog.id, updatedBlog)
  setBlogs(blogs.map(b => b.id === blog.id ? returnedBlog : b))
}


  return (
    <div>
      <h2>Blogs</h2>
      <BlogForm createBlog={createBlog} />
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} handleLike={likeBlog} />
      ))}
    </div>
  )
}

export default App
