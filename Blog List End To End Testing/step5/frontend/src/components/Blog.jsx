import React from 'react'

const Blog = ({ blog, handleLike, handleDelete, user }) => {
  const isOwner = blog.user && user && blog.user.username === user.username

  const handleDeleteClick = () => {
    if (window.confirm(`Remove blog ${blog.title}?`)) {
      handleDelete(blog.id)
    }
  }

  return (
    <div>
      <p>{blog.title} by {blog.author}</p>
      <p>likes {blog.likes} <button onClick={() => handleLike(blog.id)}>like</button></p>
      {isOwner && <button onClick={handleDeleteClick}>delete</button>}
    </div>
  )
}

export default Blog
