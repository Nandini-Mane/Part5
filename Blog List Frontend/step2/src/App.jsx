import { useState, useEffect } from 'react';

// This is a simple mock-up of the Blog component.
// In a real application, this would likely be in its own file.
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

const App = () => {
  const [username, setUsername] = useState('user');
  const [password, setPassword] = useState('1234');
  const [user, setUser] = useState(null); // The user state is initially null
  const [errorMessage, setErrorMessage] = useState(null); // New state for error messages
  const [blogs, setBlogs] = useState([
    {
      id: '1',
      title: 'How to write a great blog post',
      author: 'Jane Doe',
      url: 'http://example.com/blog-post',
      likes: 10
    },
    {
      id: '2',
      title: 'The future of web development',
      author: 'John Smith',
      url: 'http://example.com/web-dev',
      likes: 25
    },
    {
      id: '3',
      title: 'My top 5 coding tips',
      author: 'Jane Doe',
      url: 'http://example.com/coding-tips',
      likes: 15
    }
  ]);

  // Use useEffect to check for a logged-in user in local storage when the component mounts.
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser');
    if (loggedUserJSON) {
      const storedUser = JSON.parse(loggedUserJSON);
      setUser(storedUser);
    }
  }, []);

  const handleLogin = (event) => {
    event.preventDefault();

    // A mock login check. In a real app, this would be an API call.
    if (username === 'testuser' && password === 'password') {
      const loggedInUser = {
        username: 'testuser',
        name: 'Test User',
        token: 'mock-token-123'
      };
      
      // Save the user data to local storage as a JSON string.
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(loggedInUser));
      
      // On successful login, set the user state.
      setUser(loggedInUser);
      setUsername('');
      setPassword('');
      setErrorMessage(null); // Clear any previous error messages
    } else {
      // Set the error message instead of using an alert.
      setErrorMessage('Invalid credentials!');
    }
  };

  const handleLogout = () => {
    // Remove the user from local storage and set the user state back to null.
    window.localStorage.removeItem('loggedBlogAppUser');
    setUser(null);
  };

  // Conditional rendering based on the user state.
  if (user === null) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Log in to application</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            {errorMessage && (
              <div className="p-3 bg-red-100 text-red-700 rounded-md text-sm text-center">
                {errorMessage}
              </div>
            )}
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
    );
  }

  // Render this section if the user is logged in.
  return (
    <div className="min-h-screen bg-gray-100 p-8 font-sans">
      <div className="max-w-4xl mx-auto">
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
