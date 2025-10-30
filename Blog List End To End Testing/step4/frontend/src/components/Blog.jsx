import { useState } from 'react'

const Blog = ({ blog, handleLike }) => {
  const [visible, setVisible] = useState(false)

  return (
    <div className="blog">
      {blog.title} {blog.author}
      <button onClick={() => setVisible(!visible)}>
        {visible ? 'hide' : 'view'}
      </button>

      {visible && (
        <div>
          <div>{blog.url}</div>
          <div className="likes">likes {blog.likes}</div>
          <button onClick={() => handleLike(blog)}>like</button>
        </div>
      )}
    </div>
  )
}

export default Blog
