// <reference types="cypress" />
// <reference path="./custom-commands.d.ts" />

describe('Testing tickers load behaviour when scrolling and pressing next button', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  // Cypress._.times(3, () => {
  it('changes values in state object, loading only 2 to maintain stability of the app', function () {
    Cypress._.times(1, (i) => {
      // cy.window().its('overmind.state.base.error').should('equal', '')
      cy.wait(5000)
      cy.scrollTo(0, 800)
      cy.wait(5000)
      cy.get('.NextBtn').click()
      cy.wait(5000)
      cy.scrollTo(0, 800)
    })
  })

  afterEach(()=>{
    cy.window().its('overmind.state.base.memory').should('have.length.greaterThan', 0)
  })
})
