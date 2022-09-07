// <reference types="cypress" />
// <reference path="./custom-commands.d.ts" />

describe('Overmind state', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  // Cypress._.times(3, () => {
  it('changes values in state object', function () {
    Cypress._.times(3, () => {
      cy.window().its('overmind.state.base.error').should('equal', '')
      cy.wait(5000)
      cy.scrollTo(0, 500)
      cy.wait(5000)
      cy.get('.MuiButtonBase-root').click()
    })
  })

  // afterEach(()=>{
  //   cy.scrollTo(0, 500)
  //   cy.get('.MuiButtonBase-root').click()
  // })
  // })
})
