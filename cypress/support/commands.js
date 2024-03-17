/// <reference types="cypress" />

Cypress.Commands.add('lunchWebVisit', () => {
  cy.visit('http://localhost:8080/');
});
