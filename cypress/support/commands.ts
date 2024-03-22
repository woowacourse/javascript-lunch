const SELECTORS = require('../constants/selectors');

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

Cypress.Commands.add('fillRestaurantAddForm', (data) => {
  cy.get(SELECTORS.RESTAURANT_ADD_MODAL.nameInput).type(data.name);
  cy.get(SELECTORS.RESTAURANT_ADD_MODAL.categoryInput).select(data.category);
  cy.get(SELECTORS.RESTAURANT_ADD_MODAL.distanceByWalkInput).select(data.distanceByWalk);
  cy.get(SELECTORS.RESTAURANT_ADD_MODAL.descriptionInput).type(data.description);
  cy.get(SELECTORS.RESTAURANT_ADD_MODAL.referenceUrlInput).type(data.referenceUrl);
});

Cypress.Commands.add('fillRestaurantAddFormRequiredOnly', (data) => {
  cy.get(SELECTORS.RESTAURANT_ADD_MODAL.nameInput).type(data.name);
  cy.get(SELECTORS.RESTAURANT_ADD_MODAL.categoryInput).select(data.category);
  cy.get(SELECTORS.RESTAURANT_ADD_MODAL.distanceByWalkInput).select(data.distanceByWalk);
});

Cypress.Commands.add('submitRestaurantAddForm', () => {
  cy.get(SELECTORS.RESTAURANT_ADD_MODAL.submitAddingRestaurantButton).click();
});

Cypress.Commands.add('cancelRestaurantAddForm', () => {
  cy.get(SELECTORS.RESTAURANT_ADD_MODAL.cancelAddingRestaurantButton).click();
});

declare namespace Cypress {
  interface Chainable {
    visitHome(): Chainable<void>;
    selectTab(tab: string): Chainable<Element>;
    saveRestaurants(restaurants: unknown): Chainable<void>;
    openRestaurantAddModal(): Chainable<Element>;
    fillRestaurantAddForm(data: any): Chainable<Element>;
    fillRestaurantAddFormRequiredOnly(data: any): Chainable<Element>;
    submitRestaurantAddForm(): Chainable<void>;
    cancelRestaurantAddForm(): Chainable<void>;
  }
}
