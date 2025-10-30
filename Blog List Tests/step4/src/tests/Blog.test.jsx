import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import Blog from '../components/Blog'

test('clicking the like button twice calls event handler twice', () => {
  const blog = {
    id: 1,
    title: 'React testing in browser',
    author: 'Nandini Mane',
    url: 'https://react.dev',
    likes: 0,
    user: { name: 'Nandini' }
  }

  const mockHandler = vi.fn() // Vitest mock function

  render(<Blog blog={blog} handleLike={mockHandler} />)

  // show the details first
  const button = screen.getByText('view')
  fireEvent.click(button)

  // click like twice
  const likeButton = screen.getByText('like')
  fireEvent.click(likeButton)
  fireEvent.click(likeButton)

  expect(mockHandler).toHaveBeenCalledTimes(2)
})
