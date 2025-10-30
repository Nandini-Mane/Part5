import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import Blog from './Blog';

describe('Blog component tests', () => {
  const blog = {
    title: 'Component testing is a pain',
    author: 'M. P.',
    url: 'http://www.test.com',
    likes: 5,
  };

  test('calls the like handler twice when the like button is clicked twice', async () => {
    // Create a mock function to act as the event handler
    const mockHandler = jest.fn();

    render(<Blog blog={blog} handleLike={mockHandler} />);

    // First, click the "view" button to show the details
    const viewButton = screen.getByText('view');
    fireEvent.click(viewButton);

    // Now, find the "like" button and click it twice
    const likeButton = screen.getByText('like');
    fireEvent.click(likeButton);
    fireEvent.click(likeButton);

    // Assert that the mock handler was called exactly two times
    expect(mockHandler.mock.calls).toHaveLength(2);
    // Alternatively, you can use the more readable toHaveBeenCalledTimes matcher
    expect(mockHandler).toHaveBeenCalledTimes(2);
  });
});