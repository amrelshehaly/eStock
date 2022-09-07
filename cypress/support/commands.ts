// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
import {createOvermindSSR, createOvermind} from 'overmind'
import {storeConfig} from '@lib/store'

Cypress.Commands.add('overmind', () => {
    let overmind = createOvermind(storeConfig)
    console.log(overmind)
  
    const cmd = Cypress.log({
      name: 'overmind',
      consoleProps () {
        return {
          Overmind: overmind
        }
      }
    })
  
    return (
      cy
        .window({ log : false })
        // instead of .its('overmind') that always logs to the console
        // use ".then" shortcut (but without retry)
        .then(win => {
          overmind = win.overmind
          cmd.end()
          return overmind
        })
    )
  })
