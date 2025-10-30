import React from 'react'

const Blog = ({ blog, user, onLike, onDelete }) => {
  const canDelete = blog.user && user && blog.user.username === user.username

  return (
    <div style={{ marginBottom: '10px' }}>
      <strong>{blog.title}</strong> by {blog.author}
      <div>
        {blog.likes} likes{' '}
        <button onClick={() => onLike(blog.id)}>Like 👍</button>
      </div>
      <div>
        <a href={blog.url}>{blog.url}</a>
      </div>
      {canDelete && (
        <button onClick={() => onDelete(blog.id)}>🗑️ Delete</button>
      )}
    </div>
  )
}

export default Blog
