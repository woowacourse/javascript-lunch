declare global {
  namespace Cypress {
    interface Chainable {
      addRestaurant(name: string, category: string, distance: number): Chainable;
    }
  }
}

/** @ts-ignore */
Cypress.Commands.add('addRestaurant', (name: string, category: string, distance: number) => {
  cy.get('.gnb__button').click();
  cy.get('#category').select(category);
  cy.get('#name').type(name);
  cy.get('#distance').select(String(distance));
  cy.get('#modal-add').click();
});
