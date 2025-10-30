describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Test User',
      username: 'testuser',
      password: 'password',
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:5173')
  })

  it('Login form is shown', function () {
    cy.contains('login')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('testuser')
      cy.get('#password').type('password')
      cy.get('#login-button').click()
      cy.contains('Test User logged in')
    })

    it('fails with wrong credentials', function () {
      cy.get('#username').type('testuser')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()
      cy.contains('wrong username or password')
    })
  })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'testuser', password: 'password' })
    })

    it('A blog can be created', function () {
      cy.contains('new blog').click()
      cy.get('#title').type('Cypress Blog')
      cy.get('#author').type('Cypress Author')
      cy.get('#url').type('http://example.com')
      cy.get('#create-button').click()
      cy.contains('Cypress Blog Cypress Author')
    })

    describe('and a blog exists', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'Deletable Blog',
          author: 'Cypress',
          url: 'http://deleteblog.com',
        })
      })

      it('the user who created a blog can delete it', function () {
        cy.contains('view').click()
        cy.contains('delete').click()

        cy.on('window:confirm', () => true) // confirm delete popup

        cy.should('not.contain', 'Deletable Blog Cypress')
      })

      it('other users cannot see the delete button', function () {
        const newUser = {
          name: 'Other User',
          username: 'otheruser',
          password: 'password',
        }
        cy.request('POST', 'http://localhost:3003/api/users/', newUser)
        cy.login({ username: 'otheruser', password: 'password' })

        cy.contains('view').click()
        cy.get('html').should('not.contain', 'delete')
      })
    })
  })
})
