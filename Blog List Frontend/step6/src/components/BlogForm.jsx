import { useState } from 'react'

// Receives the createBlog function from the parent
const BlogForm = ({ createBlog }) => {
  // Local state for the form inputs
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  // Handler for form submission
  const addBlog = (event) => {
    event.preventDefault()
    
    // Call the prop function, passing the structured data
    createBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl,
    })

    // Reset the form fields after submission
    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
  }

  return (
    <div className="blog-form-container">
      <h2>Create New Blog Post</h2>

      <form onSubmit={addBlog}>
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input
            id="title"
            value={newTitle}
            onChange={({ target }) => setNewTitle(target.value)}
            placeholder="enter title"
          />
        </div>
        <div className="form-group">
          <label htmlFor="author">Author:</label>
          <input
            id="author"
            value={newAuthor}
            onChange={({ target }) => setNewAuthor(target.value)}
            placeholder="enter author"
          />
        </div>
        <div className="form-group">
          <label htmlFor="url">URL:</label>
          <input
            id="url"
            value={newUrl}
            onChange={({ target }) => setNewUrl(target.value)}
            placeholder="enter URL"
          />
        </div>
        <button id="create-button" type="submit">Create</button>
      </form>
    </div>
  )
}

export default BlogForm
