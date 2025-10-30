import { test, expect, beforeEach, describe } from '@playwright/test'

describe('Blog app', () => {

  beforeEach(async ({ page, request }) => {
    await request.post('http://localhost:3003/api/testing/reset')
    await request.post('http://localhost:3003/api/users', {
      data: { username: 'testuser', name: 'Test User', password: 'secret' }
    })
    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({ page }) => {
    await expect(page.getByText('log in to application')).toBeVisible()
  })

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await page.getByLabel('username').fill('testuser')
      await page.getByLabel('password').fill('secret')
      await page.getByRole('button', { name: 'login' }).click()
    })

    test('a new blog can be created', async ({ page }) => {
      await page.getByRole('button', { name: 'create' }).click()
      await page.getByLabel('title').fill('My E2E Blog')
      await page.getByLabel('author').fill('Playwright User')
      await page.getByLabel('url').fill('http://example.com')
      await page.getByRole('button', { name: 'create' }).click()

      await expect(page.getByText('My E2E Blog Playwright User')).toBeVisible()
    })
  })
})
