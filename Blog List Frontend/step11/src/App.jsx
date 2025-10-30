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
  },
  removeBlog: (id) => {
    // Simulate deleting a blog on the backend.
    return new Promise(resolve => setTimeout(() => resolve(204), 300));
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

// Custom confirmation component instead of window.confirm
const ConfirmationDialog = ({ blog, onConfirm, onCancel }) => (
  <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center p-4">
    <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full">
      <h3 className="text-lg font-bold mb-4">Confirm Deletion</h3>
      <p className="mb-6">Are you sure you want to remove the blog "{blog.title}" by {blog.author}?</p>
      <div className="flex justify-end space-x-2">
        <button onClick={onCancel} className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition">Cancel</button>
        <button onClick={onConfirm} className="px-4 py-2 text-white bg-red-600 rounded-md hover:bg-red-700 transition">Delete</button>
      </div>
    </div>
  </div>
);

const Blog = ({ blog, handleLike, handleDelete, currentUser }) => {
  // This line has been changed to always show the delete button, regardless of the user.
  const showDeleteButton = true;

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
          {/* This conditional rendering ensures the button only appears when showDeleteButton is true */}
          {showDeleteButton && (
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded-full text-sm mt-2"
              onClick={() => handleDelete(blog)}
            >
              remove
            </button>
          )}
        </div>
      </Togglable>
    </div>
  );
};

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [blogToDelete, setBlogToDelete] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      // Simulate a logged-in user
      setCurrentUser({
        name: 'Matti Luukkainen',
        id: '5a437a90fdf91d848148b811'
      });
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

  const handleDelete = (blog) => {
    // Show the custom confirmation dialog
    setBlogToDelete(blog);
  };

  const confirmDelete = async () => {
    if (blogToDelete) {
      await blogService.removeBlog(blogToDelete.id);
      setBlogs(blogs.filter(blog => blog.id !== blogToDelete.id));
      setBlogToDelete(null); // Reset the state to hide the dialog
    }
  };

  const cancelDelete = () => {
    setBlogToDelete(null); // Reset the state to hide the dialog
  };

  return (
    <div className="min-h-screen bg-pink-50 p-8 flex flex-col items-center">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-6">
        <h1 className="text-4xl font-bold text-center mb-6 text-gray-800">Blogs</h1>
        {currentUser && (
          <p className="text-center text-sm text-gray-600 mb-4">
            Logged in as {currentUser.name}.
          </p>
        )}
        {blogs.map(blog => (
          <Blog
            key={blog.id}
            blog={blog}
            handleLike={handleLike}
            handleDelete={handleDelete}
            currentUser={currentUser}
          />
        ))}
      </div>
      {blogToDelete && (
        <ConfirmationDialog
          blog={blogToDelete}
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
        />
      )}
    </div>
  );
};

export default App;
