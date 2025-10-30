import { test, expect } from '@playwright/test'

test.describe('Blog app', () => {
  test.beforeEach(async ({ page, request }) => {
    await request.post('http://localhost:3003/api/testing/reset')
    await request.post('http://localhost:3003/api/users', {
      data: { username: 'creator', name: 'Creator User', password: 'pass123' }
    })
    await request.post('http://localhost:3003/api/users', {
      data: { username: 'other', name: 'Other User', password: 'pass123' }
    })

    await page.goto('http://localhost:5173')
  })

  test('User who created a blog can delete it', async ({ page }) => {
    // Login as creator
    await page.getByTestId('username').fill('creator')
    await page.getByTestId('password').fill('pass123')
    await page.getByRole('button', { name: 'login' }).click()

    // Create blog
    await page.getByText('new blog').click()
    await page.getByTestId('title').fill('Blog by creator')
    await page.getByTestId('author').fill('Ravi')
    await page.getByTestId('url').fill('https://test.com')
    await page.getByRole('button', { name: 'create' }).click()
    await expect(page.getByText('Blog by creator')).toBeVisible()

    // Confirm dialog handling
    page.once('dialog', async (dialog) => {
      expect(dialog.message()).toContain('Remove blog')
      await dialog.accept()
    })

    // Delete blog
    await page.getByRole('button', { name: 'delete' }).click()
    await expect(page.getByText('Blog by creator')).not.toBeVisible()
  })
})
