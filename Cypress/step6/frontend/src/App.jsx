import { useState, useEffect } from "react";
import * as blogService from "./services/blogs";
import loginService from "./services/login";

function App() {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [newBlog, setNewBlog] = useState({ title: "", author: "", url: "" });
  const [message, setMessage] = useState(null);

  // Fetch blogs sorted by likes
  useEffect(() => {
    blogService.getAll().then((blogs) => {
      const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes);
      setBlogs(sortedBlogs);
    });
  }, []);

  // Keep user logged in (localStorage)
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem("loggedBlogAppUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (error) {
      setMessage("Wrong username or password");
      setTimeout(() => setMessage(null), 3000);
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem("loggedBlogAppUser");
    setUser(null);
  };

  const addBlog = async (event) => {
    event.preventDefault();
    try {
      const blog = await blogService.create(newBlog);
      setBlogs(blogs.concat(blog));
      setNewBlog({ title: "", author: "", url: "" });
    } catch (error) {
      console.error("Failed to create blog", error);
    }
  };

  const likeBlog = async (id) => {
    const blog = blogs.find((b) => b.id === id);
    const updatedBlog = { ...blog, likes: blog.likes + 1 };
    const returnedBlog = await blogService.update(id, updatedBlog);
    setBlogs(blogs.map((b) => (b.id === id ? returnedBlog : b)));
  };

  const deleteBlog = async (id) => {
    const blog = blogs.find((b) => b.id === id);
    if (window.confirm(`Delete '${blog.title}' by ${blog.author}?`)) {
      try {
        await blogService.remove(id);
        setBlogs(blogs.filter((b) => b.id !== id));
      } catch (error) {
        alert("❌ Not authorized to delete this blog");
      }
    }
  };

  if (user === null) {
    return (
      <div>
        <h2>Blog App</h2>
        {message && <p style={{ color: "red" }}>{message}</p>}
        <form onSubmit={handleLogin}>
          <div>
            Username:
            <input
              type="text"
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            Password:
            <input
              type="password"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    );
  }

  return (
    <div>
      <h2>Blog App</h2>
      <p>
        ✅ Logged in as <strong>{user.username}</strong>{" "}
        <button onClick={handleLogout}>Logout</button>
      </p>

      <h3>Create new blog</h3>
      <form onSubmit={addBlog}>
        <div>
          Title:{" "}
          <input
            value={newBlog.title}
            onChange={({ target }) =>
              setNewBlog({ ...newBlog, title: target.value })
            }
          />
        </div>
        <div>
          Author:{" "}
          <input
            value={newBlog.author}
            onChange={({ target }) =>
              setNewBlog({ ...newBlog, author: target.value })
            }
          />
        </div>
        <div>
          URL:{" "}
          <input
            value={newBlog.url}
            onChange={({ target }) =>
              setNewBlog({ ...newBlog, url: target.value })
            }
          />
        </div>
        <button type="submit">Create</button>
      </form>

      <h3>Blogs</h3>
      <ul>
        {blogs
          .sort((a, b) => b.likes - a.likes)
          .map((blog) => (
            <li key={blog.id}>
              <strong>{blog.title}</strong> by {blog.author} <br />
              {blog.likes} likes{" "}
              <button onClick={() => likeBlog(blog.id)}>👍 Like</button>
              {blog.user &&
                user.username === blog.user.username && (
                  <button onClick={() => deleteBlog(blog.id)}>🗑 Delete</button>
                )}
            </li>
          ))}
      </ul>
    </div>
  );
}

export default App;
