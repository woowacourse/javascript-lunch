/// <reference types="cypress" />
Cypress.Commands.add('visitMain', () => {
  cy.visit('http://localhost:8080/');
});

Cypress.Commands.add('setRsetaurants', (restaurants) => {
  window.localStorage.setItem('restaurants', JSON.stringify(restaurants));
});

Cypress.Commands.add('openAddModal', () => {
  cy.get('.gnb__button').click();
});

// ***********************************************
// This example commands.ts shows you how to
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
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
declare namespace Cypress {
  interface Chainable {
    visitMain(): Chainable<Element>;
    setRsetaurants(restaurant): Chainable<Element>;
    openAddModal(): Chainable<Element>;
  }
}
