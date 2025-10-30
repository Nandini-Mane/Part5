const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3001;

// Use middleware
app.use(cors());
app.use(express.json());

// Mock database with hardcoded blog posts
let blogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    "title": "Canonical string reduction",
    "author": "Edsger W. Dijkstra",
    "url": "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    "likes": 12
  }
];

// GET all blog posts
app.get('/api/blogs', (request, response) => {
  response.json(blogs);
});

// PUT request to update a blog post (specifically, the likes)
app.put('/api/blogs/:id', (request, response) => {
  const id = request.params.id;
  const body = request.body;

  // Find the blog post to update
  const blogToUpdate = blogs.find(blog => blog._id === id);

  if (blogToUpdate) {
    // Increment likes and update the other fields from the request body
    const updatedBlog = {
      ...blogToUpdate,
      ...body,
      likes: body.likes, // The new like count from the frontend
    };

    // Replace the old blog post with the updated one
    blogs = blogs.map(blog => blog._id === id ? updatedBlog : blog);

    // Send the updated blog post back as a response
    response.json(updatedBlog);
  } else {
    response.status(404).json({ error: 'Blog post not found' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
