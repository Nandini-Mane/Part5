describe('Blog app', function () {
  beforeEach(function () {
    // reset DB (optional if you have reset route)
    // cy.request('POST', 'http://localhost:3003/api/testing/reset')

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

      // Create a new blog first
      cy.get('input[placeholder="title"]').type('Like test blog')
      cy.get('input[placeholder="author"]').type('Cypress Tester')
      cy.get('input[placeholder="url"]').type('http://example.com')
      cy.contains('create').click()
      cy.contains('Like test blog')
    })

    it('User can like a blog', function () {
      // Verify blog is displayed
      cy.contains('Like test blog')

      // Click like button and check that likes increment
      cy.contains('Like test blog').parent().find('button').as('likeButton')

      cy.get('@likeButton').click()
      cy.contains('1 likes')   // verifies the count updates
    })
  })
})
