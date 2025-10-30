import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import BlogForm from '../components/BlogForm'

test('calls event handler with right details when a new blog is created', () => {
  const createBlog = vi.fn()

  render(<BlogForm createBlog={createBlog} />)

  const titleInput = screen.getByLabelText('title:', { exact: false })
  const authorInput = screen.getByLabelText('author:', { exact: false })
  const urlInput = screen.getByLabelText('url:', { exact: false })
  const form = screen.getByRole('form', { hidden: true }) // optional if using role

  fireEvent.change(titleInput, { target: { value: 'Testing BlogForm' } })
  fireEvent.change(authorInput, { target: { value: 'Nandini' } })
  fireEvent.change(urlInput, { target: { value: 'https://example.com' } })
  fireEvent.submit(form || screen.getByText('create'))

  expect(createBlog).toHaveBeenCalledTimes(1)
  expect(createBlog).toHaveBeenCalledWith({
    title: 'Testing BlogForm',
    author: 'Nandini',
    url: 'https://example.com'
  })
})
