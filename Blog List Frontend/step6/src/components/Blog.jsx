import React from 'react'

const Blog = ({ blog }) => (
  <div style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
    <p>
      **{blog.title}** by {blog.author}
    </p>
    <small>
      URL: <a href={blog.url} target="_blank" rel="noopener noreferrer">{blog.url}</a>
      <br />
      Likes: {blog.likes}
    </small>
  </div>
)

export default Blog
