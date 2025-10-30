import { test, expect } from '@playwright/test'

test.describe('Blog app', () => {
  test('A blog can be liked', async ({ page }) => {
    await page.goto('http://localhost:5173')

    // create blog
    await page.getByPlaceholder('Title').fill('Test Like Blog')
    await page.getByPlaceholder('Author').fill('E2E Tester')
    await page.getByPlaceholder('URL').fill('http://example.com')
    await page.getByRole('button', { name: 'create' }).click()

    // show blog details
    await page.getByRole('button', { name: 'view' }).click()

    // click like button
    await page.getByRole('button', { name: 'like' }).click()

    // check likes increment
    await expect(page.locator('.likes')).toContainText('1')
  })
})
