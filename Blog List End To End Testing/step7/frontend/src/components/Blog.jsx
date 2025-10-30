// src/components/Blog.jsx
import { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, updateBlog, user }) => {
  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const handleLike = async () => {
    try {
      const updatedBlog = {
        ...blog,
        likes: blog.likes + 1,
        user: blog.user.id || blog.user, // handles case where user is object or id
      }

      const returnedBlog = await blogService.update(blog.id, updatedBlog)
      updateBlog(returnedBlog)
    } catch (error) {
      console.error('Error liking blog:', error)
    }
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  return (
    <div style={blogStyle} className="blog">
      {blog.title} {blog.author}
      <button onClick={toggleVisibility}>{visible ? 'hide' : 'view'}</button>

      {visible && (
        <div>
          <p>{blog.url}</p>
          <p>
            likes {blog.likes}{' '}
            <button onClick={handleLike} className="likeButton">like</button>
          </p>
          <p>{blog.user?.name}</p>
          {user && blog.user?.username === user.username && (
            <button onClick={() => blogService.remove(blog.id)}>delete</button>
          )}
        </div>
      )}
    </div>
  )
}

export default Blog
