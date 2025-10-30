import { useState, useEffect } from 'react';

// This is a simple mock-up of the Blog component.
const Blog = ({ blog }) => {
  return (
    <div className="p-4 bg-white rounded-lg shadow-sm mb-4 border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900">{blog.title}</h3>
      <p className="text-gray-600">{blog.author}</p>
      <a href={blog.url} className="text-blue-500 hover:underline">{blog.url}</a>
      <p className="text-sm text-gray-500 mt-2">Likes: {blog.likes}</p>
    </div>
  );
};

// Notification component to display messages.
const Notification = ({ message, type }) => {
  if (message === null) {
    return null;
  }

  const baseStyles = "p-4 rounded-lg text-white mb-4 text-center";
  const typeStyles = type === 'success' ? "bg-green-500" : "bg-red-500";
  const finalStyles = `${baseStyles} ${typeStyles}`;

  return (
    <div className={finalStyles}>
      {message}
    </div>
  );
};

const App = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [blogs, setBlogs] = useState([
    { id: '1', title: 'How to write a great blog post', author: 'Jane Doe', url: 'http://example.com/blog-post', likes: 10 },
    { id: '2', title: 'The future of web development', author: 'John Smith', url: 'http://example.com/web-dev', likes: 25 },
    { id: '3', title: 'My top 5 coding tips', author: 'Jane Doe', url: 'http://example.com/coding-tips', likes: 15 }
  ]);
  const [newTitle, setNewTitle] = useState('');
  const [newAuthor, setNewAuthor] = useState('');
  const [newUrl, setNewUrl] = useState('');
  const [notification, setNotification] = useState({ message: null, type: null });
  const [blogFormVisible, setBlogFormVisible] = useState(false);

  // Use useEffect to check for a logged-in user in local storage when the component mounts.
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser');
    if (loggedUserJSON) {
      const storedUser = JSON.parse(loggedUserJSON);
      setUser(storedUser);
    }
  }, []);

  // Function to show and hide a notification.
  const showNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification({ message: null, type: null });
    }, 5000); // Hide after 5 seconds
  };

  const handleLogin = (event) => {
    event.preventDefault();
    if (username === 'testuser' && password === 'password') {
      const loggedInUser = {
        username: 'testuser',
        name: 'Test User',
        token: 'mock-token-123'
      };
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(loggedInUser));
      setUser(loggedInUser);
      setUsername('');
      setPassword('');
      showNotification('Login successful!', 'success');
    } else {
      showNotification('wrong username or password', 'error');
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogAppUser');
    setUser(null);
    showNotification('Logged out successfully.', 'success');
  };

  const handleCreateBlog = (event) => {
    event.preventDefault();
    const newBlog = {
      id: Date.now().toString(),
      title: newTitle,
      author: newAuthor,
      url: newUrl,
      likes: 0
    };

    setBlogs(blogs.concat(newBlog));
    setNewTitle('');
    setNewAuthor('');
    setNewUrl('');
    showNotification(`A new blog "${newBlog.title}" by ${newBlog.author} was added!`, 'success');
    setBlogFormVisible(false); // Hide the form after creation
  };

  const handleCancel = () => {
    setBlogFormVisible(false);
  };

  const loginForm = () => (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="w-full max-w-sm">
        <Notification message={notification.message} type={notification.type} />
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Log in to application</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-gray-700 font-medium mb-1" htmlFor="username">Username</label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={({ target }) => setUsername(target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1" htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={({ target }) => setPassword(target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white font-semibold py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              login
            </button>
          </form>
        </div>
      </div>
    </div>
  );

  const blogForm = () => (
    <section className="bg-white p-6 rounded-lg shadow-sm mb-6">
      <h3 className="text-xl font-bold mb-4 text-gray-800">create new</h3>
      <form onSubmit={handleCreateBlog} className="space-y-4">
        <div>
          <label className="block text-gray-700 font-medium mb-1" htmlFor="title">title:</label>
          <input
            id="title"
            type="text"
            value={newTitle}
            onChange={({ target }) => setNewTitle(target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-1" htmlFor="author">author:</label>
          <input
            id="author"
            type="text"
            value={newAuthor}
            onChange={({ target }) => setNewAuthor(target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-1" htmlFor="url">url:</label>
          <input
            id="url"
            type="text"
            value={newUrl}
            onChange={({ target }) => setNewUrl(target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex space-x-2">
          <button
            type="submit"
            className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            create
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            cancel
          </button>
        </div>
      </form>
    </section>
  );

  if (user === null) {
    return loginForm();
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8 font-sans">
      <div className="max-w-4xl mx-auto">
        <Notification message={notification.message} type={notification.type} />
        <header className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-2">
            <h2 className="text-3xl font-bold text-gray-800">blogs</h2>
            <span className="text-gray-600">({user.name} logged in)</span>
          </div>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            logout
          </button>
        </header>

        {!blogFormVisible && (
          <button
            onClick={() => setBlogFormVisible(true)}
            className="mb-6 bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            create new blog
          </button>
        )}

        {blogFormVisible && blogForm()}

        <div className="grid gap-4">
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
