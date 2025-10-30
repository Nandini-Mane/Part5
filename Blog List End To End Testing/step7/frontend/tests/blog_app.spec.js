test('blogs are arranged in descending order of likes', async ({ page, request }) => {
  // reset backend
  await request.post('http://localhost:3003/api/testing/reset')

  // create a user
  await request.post('http://localhost:3003/api/users', {
    data: {
      username: 'testuser',
      name: 'Test User',
      password: 'secret'
    }
  })

  // login and store token
  const response = await request.post('http://localhost:3003/api/login', {
    data: { username: 'testuser', password: 'secret' }
  })
  const { token } = await response.json()

  // create blogs with different like counts
  const blogs = [
    { title: 'First Blog', author: 'Author 1', url: 'http://1.com', likes: 10 },
    { title: 'Second Blog', author: 'Author 2', url: 'http://2.com', likes: 20 },
    { title: 'Third Blog', author: 'Author 3', url: 'http://3.com', likes: 15 },
  ]

  for (const blog of blogs) {
    await request.post('http://localhost:3003/api/blogs', {
      data: blog,
      headers: { Authorization: `Bearer ${token}` }
    })
  }

  // open frontend
  await page.goto('http://localhost:5173')

  // login
  await page.getByRole('textbox', { name: 'Username' }).fill('testuser')
  await page.getByRole('textbox', { name: 'Password' }).fill('secret')
  await page.getByRole('button', { name: 'login' }).click()

  // check order
  const blogElements = await page.locator('.blog').allTextContents()
  const titles = blogElements.map(b => b.split('\n')[0]) // extract title text

  // Expected order by likes: Second Blog (20), Third Blog (15), First Blog (10)
  expect(titles).toEqual(['Second Blog', 'Third Blog', 'First Blog'])
})
