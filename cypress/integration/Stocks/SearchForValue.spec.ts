describe('searching for ticker', async () => {
    beforeEach(() => {
      cy.visit('/')
    })
  
    it('Should get the value searched for in search field', async () => {
      cy.wait(15000)
      cy.scrollTo(0, 0)
      cy.get('.inputField')
        .type('AAPL')
        .type('{enter}')
        .then(() => {
          cy.window()
            .its('overmind.state.stock.results')
            .should('not.be.empty')
            .then((list) =>
              // from every object in the list, pick the "name" property
              Cypress._.map(list, (o) => Cypress._.pick(o, 'ticker')),
            )
            .should('deep.include', { ticker: 'AAPL' })
        })
    })
  
  })