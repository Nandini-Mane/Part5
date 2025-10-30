import React from 'react';
import Blog from './components/Blog';

const App = () => {
  const blogs = [
    {
      id: '1',
      title: 'Component testing is a pain',
      author: 'M. P.',
      url: 'http://www.test.com',
      likes: 5
    },
    {
      id: '2',
      title: 'Another blog post',
      author: 'A. B.',
      url: 'http://www.another.com',
      likes: 10
    }
  ];

  return (
    <div>
      <h1>Blogs</h1>
      {blogs.map(blog => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default App;