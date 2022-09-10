describe('Ticker Details', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should open ticker details when clicking on first one of them', async () => {
    cy.wait(10000)
     cy.get('.ticker').first().click()
     cy.window().its('overmind.state.stockDetails.ticker').should('equal', 'A')
     cy.window().its('overmind.state.stockDetails.name').should('equal', 'Agilent Technologies Inc.')
  })
})