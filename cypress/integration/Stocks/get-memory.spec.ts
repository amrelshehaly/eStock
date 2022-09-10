describe('Check if still have memory after clicking on a ticker details and then clicking back', () =>{
  beforeEach(() => {
      cy.visit('/')
  })
  it('should still have a data in memory ', () =>{
    cy.wait(10000)
    cy.get('.ticker').first().click()
    cy.get('.backBtn').click()
    cy.window().its('overmind.state.base.memory').should('have.length.greaterThan', '0')
  })
})