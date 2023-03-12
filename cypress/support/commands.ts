/// <reference types="cypress" />
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
    addSampleRestaurant(): Chainable<void>;
  }
}

Cypress.Commands.add('addSampleRestaurant', () => {
  cy.get('.gnb__button').click();
  cy.get('select#category').select('한식');
  cy.get('input#name').type('김돈이');
  cy.get('select#distance').select('5분 내');
  cy.get('textarea#description').type('계란말이 맛집');
  cy.get('input#link').type('https://naver.me/xWNiNeSS');
  cy.get('.button').contains('추가하기').click();
});
