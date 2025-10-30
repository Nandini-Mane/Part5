import { useState } from 'react'
import Blog from './components/Blog'

const App = () => {
  const [likeCount, setLikeCount] = useState(0)

  const handleLike = (id) => {
    console.log(`Blog with id ${id} liked!`)
    setLikeCount(likeCount + 1)
  }

  const blog = {
    id: 1,
    title: 'React testing in browser',
    author: 'Nandini Mane',
    url: 'https://react.dev',
    likes: 0,
    user: { name: 'Nandini' }
  }

  return (
    <div style={{ padding: '20px' }}>
      <h2>Blog Test (Browser Demo)</h2>
      <Blog blog={blog} handleLike={handleLike} />
      <p>
        <strong>Total like button clicks:</strong> {likeCount}
      </p>
      <p>Check the console to see each click logged!</p>
    </div>
  )
}

export default App
