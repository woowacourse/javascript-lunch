/// <reference types="cypress" />
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
