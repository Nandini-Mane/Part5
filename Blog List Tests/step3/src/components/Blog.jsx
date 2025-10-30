import { useState } from 'react'

const Blog = ({ blog, handleLike }) => {
  const [visible, setVisible] = useState(false)
  const [likes, setLikes] = useState(blog.likes)

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const addLike = () => {
    setLikes(likes + 1)
    handleLike(blog.id)
  }

  return (
    <div className="blog" style={{ border: '1px solid #ccc', padding: '8px', marginBottom: '5px' }}>
      <div>
        <strong>{blog.title}</strong> {blog.author}
        <button onClick={toggleVisibility}>{visible ? 'hide' : 'view'}</button>
      </div>

      {visible && (
        <div className="togglableContent">
          <div>URL: {blog.url}</div>
          <div>
            likes: {likes}
            <button onClick={addLike}>like</button>
          </div>
          <div>Added by: {blog.user?.name}</div>
        </div>
      )}
    </div>
  )
}

export default Blog
