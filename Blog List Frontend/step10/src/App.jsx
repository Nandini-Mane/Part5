import { useState, useEffect } from 'react';

// A mock backend service to simulate data fetching and updates.
// In a real application, these would be API calls.
const blogService = {
  getBlogs: () => {
    // Simulate fetching blogs from a backend with user data.
    const mockBlogs = [
      {
        id: '5a451df7571c224a31b5c8ce',
        title: 'FP vs. OO List Processing',
        author: 'Robert C. Martin',
        url: 'https://blog.cleancoder.com/uncle-bob/2018/12/17/FPvsOO-List-processing.html',
        likes: 0,
        user: {
          id: '5a437a90fdf91d848148b811',
          name: 'Matti Luukkainen',
        }
      },
      {
        id: '5a451df7571c224a31b5c8ce-1',
        title: 'On let vs const',
        author: 'Dan Abramov',
        url: 'https://overreacted.io/on-let-vs-const/',
        likes: 1,
        user: {
          id: '5a437a90fdf91d848148b812',
          name: 'Dan Abramov',
        }
      },
      {
        id: '5a451df7571c224a31b5c8ce-2',
        title: 'Clean Code',
        author: 'Robert C. Martin',
        url: 'https://blog.cleancoder.com/',
        likes: 3,
        user: {
          id: '5a437a90fdf91d848148b813',
          name: 'Uncle Bob',
        }
      }
    ];
    return new Promise(resolve => setTimeout(() => resolve(mockBlogs), 500));
  },
  updateBlog: (id, updatedBlog) => {
    // Simulate updating a blog on the backend.
    return new Promise(resolve => setTimeout(() => resolve(updatedBlog), 300));
  }
};

const Togglable = ({ buttonLabel, children }) => {
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const showWhenVisible = { display: visible ? '' : 'none' };

  return (
    <div>
      <div style={showWhenVisible}>
        {children}
        <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-1 px-2 rounded-full mt-2" onClick={toggleVisibility}>hide</button>
      </div>
      <div style={{ display: visible ? 'none' : '' }}>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded-full" onClick={toggleVisibility}>{buttonLabel}</button>
      </div>
    </div>
  );
};

const Blog = ({ blog, handleLike }) => {
  return (
    <div className="border border-gray-300 p-4 mb-4 rounded-lg shadow-md bg-white">
      <div className="font-semibold text-lg">
        {blog.title} by {blog.author}
      </div>
      <Togglable buttonLabel="show details">
        <div className="mt-2 text-gray-600">
          <a href={blog.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
            {blog.url}
          </a>
          <div className="flex items-center space-x-2 mt-2">
            <div>likes {blog.likes}</div>
            <button
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-1 px-2 rounded-full text-sm"
              onClick={() => handleLike(blog)}
            >
              like
            </button>
          </div>
          {blog.user && <div className="mt-2 text-sm text-gray-500">Added by: {blog.user.name}</div>}
        </div>
      </Togglable>
    </div>
  );
};

const App = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      const initialBlogs = await blogService.getBlogs();
      // Sort the blogs by likes in descending order before setting the state.
      const sortedBlogs = [...initialBlogs].sort((a, b) => b.likes - a.likes);
      setBlogs(sortedBlogs);
    };

    fetchBlogs();
  }, []);

  const handleLike = async (blogToUpdate) => {
    const updatedBlog = {
      ...blogToUpdate,
      likes: blogToUpdate.likes + 1,
    };

    // Simulate a backend update and get the returned blog object.
    const returnedBlog = await blogService.updateBlog(blogToUpdate.id, updatedBlog);

    // Update the blogs array in state with the new blog and then sort it.
    const newBlogs = blogs.map(blog =>
      blog.id === blogToUpdate.id ? returnedBlog : blog
    );
    const sortedBlogs = newBlogs.sort((a, b) => b.likes - a.likes);
    setBlogs([...sortedBlogs]);
  };

  return (
    <div className="min-h-screen bg-pink-50 p-8 flex flex-col items-center">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-6">
        <h1 className="text-4xl font-bold text-center mb-6 text-gray-800">Blogs</h1>
        {blogs.map(blog => (
          <Blog
            key={blog.id}
            blog={blog}
            handleLike={handleLike}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
