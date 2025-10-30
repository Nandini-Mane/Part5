describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Test User',
      username: 'testuser',
      password: 'password'
    }
    cy.request('POST', 'http://localhost:3003/api/users', user)
    cy.visit('http://localhost:5173')
  })

  it('Login form is shown', function () {
    cy.contains('Login')
  })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.get('input:first').type('testuser')
      cy.get('input[type="password"]').type('password')
      cy.get('button').click()
    })

    it('A blog can be created', function () {
      cy.get('input[placeholder="title"]').type('Cypress Blog')
      cy.get('input[placeholder="author"]').type('Tester')
      cy.get('input[placeholder="url"]').type('http://example.com')
      cy.contains('create').click()
      cy.contains('Cypress Blog')
    })
  })
})
