const { test, expect, describe, beforeEach } = require('@playwright/test')

describe('Blog app', () => {
  beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({ page }) => {
    await expect(page.getByText('Log in to application')).toBeVisible()
    await expect(page.getByRole('button', { name: 'login' })).toBeVisible()
  })

  test('User can log in and see blogs', async ({ page }) => {
    await page.fill('#username', 'testuser')
    await page.fill('#password', 'password')
    await page.click('#login-button')

    await expect(page.getByText('Welcome, testuser!')).toBeVisible()
    await expect(page.getByText('Blogs')).toBeVisible()
  })
})
