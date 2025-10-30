// playwright.config.js
import { defineConfig } from '@playwright/test'

export default defineConfig({
  testDir: './tests',
  use: {
    headless: false, // show browser
    baseURL: 'http://localhost:5173'
  }
})
