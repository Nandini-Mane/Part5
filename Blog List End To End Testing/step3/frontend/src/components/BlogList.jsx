import { useEffect, useState } from 'react'
import blogService from '../services/blogs'

const BlogList = () => {
  const [blogs, setBlogs] = useState([]) // ✅ initialize with empty array

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const allBlogs = await blogService.getAll()
        setBlogs(allBlogs)
      } catch (error) {
        console.error('❌ Error fetching blogs:', error)
      }
    }
    fetchBlogs()
  }, [])

  if (!blogs || blogs.length === 0) {
    return <p>No blogs available yet.</p> // ✅ prevents map crash
  }

  return (
    <div>
      <h2>Blogs</h2>
      <ul>
        {blogs.map(blog => (
          <li key={blog.id}>
            <strong>{blog.title}</strong> by {blog.author}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default BlogList
