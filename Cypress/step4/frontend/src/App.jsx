import { useState, useEffect } from "react"

// --- App component ---
function App() {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [user, setUser] = useState(null)
  const [newBlog, setNewBlog] = useState({ title: "", author: "", url: "" })

  // 🔹 Fetch all blogs when page loads
  useEffect(() => {
    fetch("http://localhost:3003/api/blogs")
      .then((res) => res.json())
      .then((data) => setBlogs(data))
  }, [])

  // 🔹 Handle Login
  const handleLogin = async (e) => {
    e.preventDefault()
    const res = await fetch("http://localhost:3003/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    })

    if (!res.ok) {
      alert("❌ Wrong credentials")
      return
    }

    const userData = await res.json()
    setUser(userData)
    setUsername("")
    setPassword("")
    console.log("✅ Logged in:", userData)
  }

  // 🔹 Handle Logout
  const handleLogout = () => {
    setUser(null)
  }

  // 🔹 Handle new blog creation
  const handleCreateBlog = async (e) => {
    e.preventDefault()

    const res = await fetch("http://localhost:3003/api/blogs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify(newBlog),
    })

    if (!res.ok) {
      alert("❌ Failed to create blog — check backend or token setup")
      return
    }

    const created = await res.json()
    setBlogs(blogs.concat(created))
    setNewBlog({ title: "", author: "", url: "" })
  }

  // 🔹 Handle Like button click
  const handleLike = async (blog) => {
    const updatedBlog = { ...blog, likes: (blog.likes || 0) + 1 }

    const res = await fetch(`http://localhost:3003/api/blogs/${blog.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedBlog),
    })

    if (!res.ok) {
      alert("❌ Failed to like blog")
      return
    }

    const returned = await res.json()
    setBlogs(blogs.map((b) => (b.id === blog.id ? returned : b)))
  }

  // --- JSX UI ---
  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h2>Blog App</h2>

      {!user && (
        <div>
          <h3>Login</h3>
          <form onSubmit={handleLogin}>
            <div>
              Username:
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              Password:
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit">Login</button>
          </form>
        </div>
      )}

      {user && (
        <div>
          <p>
            ✅ Logged in as <b>{user.username}</b>{" "}
            <button onClick={handleLogout}>Logout</button>
          </p>

          <h3>Create new blog</h3>
          <form onSubmit={handleCreateBlog}>
            <div>
              Title:
              <input
                type="text"
                value={newBlog.title}
                onChange={(e) =>
                  setNewBlog({ ...newBlog, title: e.target.value })
                }
              />
            </div>
            <div>
              Author:
              <input
                type="text"
                value={newBlog.author}
                onChange={(e) =>
                  setNewBlog({ ...newBlog, author: e.target.value })
                }
              />
            </div>
            <div>
              URL:
              <input
                type="text"
                value={newBlog.url}
                onChange={(e) => setNewBlog({ ...newBlog, url: e.target.value })}
              />
            </div>
            <button type="submit">Create</button>
          </form>

          <h3>Blogs</h3>
          <ul>
            {blogs.map((blog) => (
              <li key={blog.id}>
                <b>{blog.title}</b> by {blog.author} <br />
                {blog.likes || 0} likes{" "}
                <button onClick={() => handleLike(blog)}>Like 👍</button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default App
