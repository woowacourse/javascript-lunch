Cypress.Commands.add('visitHome', () => {
  cy.visit('http://localhost:8080');
});

Cypress.Commands.add('selectTab', (tab) => {
  cy.get(`restaurant-list-tab > #tab-${tab}-button`).click();
});

Cypress.Commands.add('saveRestaurants', (restaurants) => {
  window.localStorage.setItem('restaurants', JSON.stringify(restaurants));
});

Cypress.Commands.add('openRestaurantAddModal', () => {
  cy.get('#add-restaurant-button').click();
});

declare namespace Cypress {
  interface Chainable {
    visitHome(): Chainable<void>;
    selectTab(tab: string): Chainable<Element>;
    saveRestaurants(restaurants: unknown): Chainable<void>;
    openRestaurantAddModal(): Chainable<Element>;
  }
}
