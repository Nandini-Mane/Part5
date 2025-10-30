let blogs = [
  {
    id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
  },
  {
    id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
  },
]

// Returns all blogs
const getAll = () => {
  // In a real application, this would be an axios.get call
  return Promise.resolve(blogs)
}

// Simulates creating a new blog
const create = (newBlog) => {
  // Simulate adding a unique ID and default likes
  const blogWithId = {
    ...newBlog,
    id: String(Date.now()), // Mock ID
    likes: 0,
  }
  blogs = blogs.concat(blogWithId)
  console.log('Mock API: New blog added:', blogWithId)
  
  // In a real application, this would be an axios.post call
  return Promise.resolve(blogWithId)
}

export default { getAll, create }
