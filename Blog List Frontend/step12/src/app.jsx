import { useState, useEffect } from 'react';
import axios from 'axios';
import { createRoot } from 'react-dom/client';

// Main component that contains all the application logic
const App = () => {
  // State to hold the list of blog posts
  const [blogs, setBlogs] = useState([]);

  // Use useEffect to fetch the blogs from the backend when the component mounts
  useEffect(() => {
    // Define the async function to fetch data
    const fetchBlogs = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/blogs');
        setBlogs(response.data);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };

    fetchBlogs();
  }, []);

  // Function to handle the like button click
  const handleLike = async (blogToLike) => {
    // Create the updated blog object with the incremented likes count
    const updatedBlog = {
      ...blogToLike,
      likes: blogToLike.likes + 1,
    };

    try {
      // Make the HTTP PUT request to the backend
      const response = await axios.put(`http://localhost:3001/api/blogs/${blogToLike._id}`, updatedBlog);

      // Update the state with the new blog data returned from the server
      setBlogs(
        blogs.map((blog) =>
          blog._id === blogToLike._id ? response.data : blog
        )
      );
    } catch (error) {
      console.error('Error updating likes:', error);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen p-8 font-sans antialiased">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-8 text-center">
          Blog List
        </h1>
        {blogs.length === 0 ? (
          <p className="text-gray-600 text-center">No blogs to display.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.map((blog) => (
              <div
                key={blog._id}
                className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden"
              >
                <div className="p-6">
                  <h2 className="text-xl font-bold text-gray-800 mb-2">
                    {blog.title}
                  </h2>
                  <p className="text-sm text-gray-500 mb-4">
                    by <span className="font-semibold text-gray-700">{blog.author}</span>
                  </p>
                  <a
                    href={blog.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:text-blue-700 transition-colors duration-200 break-words block mb-4"
                  >
                    {blog.url}
                  </a>
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-gray-600 font-medium">{blog.likes}</span>
                      <span className="text-gray-500">
                        {blog.likes === 1 ? 'Like' : 'Likes'}
                      </span>
                    </div>
                    <button
                      onClick={() => handleLike(blog)}
                      className="bg-purple-600 text-white font-semibold py-2 px-4 rounded-full shadow-md hover:bg-purple-700 transition-colors duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 inline-block -mt-1 mr-1"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Like
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// We will use this to render the app to the root div in the HTML
const root = createRoot(document.getElementById('root'));
root.render(<App />);
