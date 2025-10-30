import BlogForm from './components/BlogForm'

const App = () => {
  const handleCreateBlog = (newBlog) => {
    console.log('Blog created:', newBlog)
  }

  return (
    <div style={{ padding: '20px' }}>
      <h2>Blog Form Demo</h2>
      <BlogForm createBlog={handleCreateBlog} />
      <p>Check console after form submit to see blog data!</p>
    </div>
  )
}

export default App
