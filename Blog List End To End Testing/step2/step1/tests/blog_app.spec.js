import { test, expect, describe, beforeEach } from '@playwright/test'

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http://localhost:3003/api/testing/reset')
    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({ page }) => {
    await expect(page.getByText('Login to application')).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await page.fill('input[placeholder="username"]', 'testuser')
      await page.fill('input[placeholder="password"]', 'password')
      await page.click('button[type="submit"]')
      await expect(page.getByText('Test User logged in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await page.fill('input[placeholder="username"]', 'testuser')
      await page.fill('input[placeholder="password"]', 'wrong')
      await page.click('button[type="submit"]')
      await expect(page.getByText('Invalid credentials')).toBeVisible()
    })
  })
})
