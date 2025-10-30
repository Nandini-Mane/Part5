import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm' // Import the new component
import blogService from './services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])

  // Fetch initial blogs on component mount
  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  // Handler function passed to BlogForm
  // This function is responsible for calling the service and updating the state
  const addBlog = async (blogObject) => {
    try {
      // Call the mock API service
      const returnedBlog = await blogService.create(blogObject)
      
      // Update the blogs state to include the new blog
      setBlogs(blogs.concat(returnedBlog))
      
      console.log('Successfully added blog:', returnedBlog.title)
      // In a real app, you would show a success notification here
      
    } catch (exception) {
      console.error('Blog creation failed:', exception)
      // In a real app, you would show an error notification here
    }
  }

  return (
    <div className="container">
      <header>
        <h1>Blog List Application</h1>
      </header>

      <section className="create-form-section">
        {/* Render the BlogForm and pass the handler function */}
        <BlogForm createBlog={addBlog} />
      </section>

      <hr />

      <section className="blog-list-section">
        <h2>Blogs</h2>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </section>
    </div>
  )
}

export default App
