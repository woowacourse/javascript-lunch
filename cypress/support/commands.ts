/// <reference types="cypress" />

Cypress.Commands.add('visitMainPage', () => {
  cy.visit('http://localhost:8080/');
});

Cypress.Commands.add('openModal', () => {
  cy.visitMainPage();

  cy.get('.gnb__button').click();

  cy.get('.modal').should('have.class', 'modal--open');
});

Cypress.Commands.add('closeModal', () => {
  cy.get('.modal.modal--open').invoke('removeClass', 'modal--open');
});

declare namespace Cypress {
  interface Chainable {
    /**
     * 메인 페이지 방문
     */
    visitMainPage(): Chainable<Element>;
    openModal(): Chainable<Element>;
    closeModal(): Chainable<Element>;
  }
}

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
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }
