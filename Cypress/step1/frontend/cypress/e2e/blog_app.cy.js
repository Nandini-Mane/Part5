describe('Blog app', function() {
  beforeEach(function() {
    cy.visit('/') // ✅ now works thanks to baseUrl
  })

  it('Login form is shown', function() {
    cy.contains('Login')
    cy.get('input[name="Username"]')
    cy.get('input[name="Password"]')
    cy.get('button').contains('login')
  })
})
