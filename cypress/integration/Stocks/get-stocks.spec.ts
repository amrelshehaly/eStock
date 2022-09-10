// <reference types="cypress" />
// <reference path="./custom-commands.d.ts" />

describe('Testing tickers load behaviour when scrolling and pressing next button', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  // Cypress._.times(3, () => {
  it('changes values in state object, loading only 2 to maintain stability of the app', function () {
    cy.wait(10000)  // waiting for a splash screen to load
    Cypress._.times(1, (i) => {
      cy.wait(5000) // waiting for the request to load and to prevent api limit request error
      cy.scrollTo(0, 800)
      cy.wait(5000) // waiting for the request to load and to prevent api limit request error
      cy.get('.NextBtn').click()
      cy.wait(5000)  // waiting for the request to load and to prevent api limit request error
      cy.scrollTo(0, 800)
    })
  })

  afterEach(()=>{
    cy.window().its('overmind.state.base.memory').should('have.length.greaterThan', 0)
  })
})
