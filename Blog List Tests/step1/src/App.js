import React from 'react';
import Blog from './components/Blog';

const App = () => {
  const blogs = [
    {
      id: '1',
      title: 'Component testing is a pain',
      author: 'M. P.',
      url: 'http://www.test.com',
      likes: 5,
    },
  ];

  const handleLike = () => {
    console.log('like button clicked');
  };

  return (
    <div>
      <h1>Blogs</h1>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} handleLike={handleLike} />
      ))}
    </div>
  );
};

export default App;