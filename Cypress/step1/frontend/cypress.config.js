const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    // Base URL of your frontend
    baseUrl: 'http://localhost:5173',

    // This tells Cypress where to find test files
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',

    // Clean up between tests
    setupNodeEvents(on, config) {
      // you can define event listeners here if needed later
    },
  },
})
