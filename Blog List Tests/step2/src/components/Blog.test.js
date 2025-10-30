// src/components/Blog.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Blog from './Blog';


describe('Blog component tests', () => {

  const blog = {
    title: 'Component testing is a pain',
    author: 'M. P.',
    url: 'http://www.test.com',
    likes: 5,
  };

  test('renders title and author, but not URL and likes by default', () => {
    render(<Blog blog={blog} />);

    // Check that title and author are present
    const element = screen.getByText('Component testing is a pain by M. P.');
    expect(element).toBeDefined();

    // Check that URL and likes are NOT visible by default
    const urlElement = screen.queryByText('http://www.test.com');
    expect(urlElement).toBeNull();
    const likesElement = screen.queryByText('likes 5');
    expect(likesElement).toBeNull();
  });

  test('shows URL and likes when the view button is clicked', () => {
    render(<Blog blog={blog} />);

    // Find the 'view' button and click it
    const button = screen.getByText('view');
    fireEvent.click(button);

    // Now, check that the URL and likes are visible
    const urlElement = screen.getByText('http://www.test.com');
    expect(urlElement).toBeDefined();
    const likesElement = screen.getByText('likes 5');
    expect(likesElement).toBeDefined();
  });
});