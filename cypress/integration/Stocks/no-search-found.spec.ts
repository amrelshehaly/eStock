describe('Check if the searchbar handle unknown ticker', async ()=>{
    it('check the response if not a result found', async () =>{
      cy.wait(5000)
      cy.scrollTo(0, 0)
      cy.get('.inputField')
        .type('asdfghjkl')
        .type('{enter}')
        .then(()=>{
          cy.window()
            .its('overmind.state.stock.results')
            .should('be.empty')
        })
    })
  })