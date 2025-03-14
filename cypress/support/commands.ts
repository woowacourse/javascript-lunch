type RestaurantAddType = {
  name: string;
  category: string;
  distance: number;
  description?: string;
  url?: string;
};

declare global {
  namespace Cypress {
    interface Chainable {
      addRestaurant(restaurantAdd: RestaurantAddType): Chainable;
    }
  }
}

/** @ts-expect-error cypress */
Cypress.Commands.add('addRestaurant', (restaurantAdd: RestaurantAddType) => {
  cy.get('.gnb__button').click();
  cy.get('#category').select(restaurantAdd.category);
  cy.get('#name').type(restaurantAdd.name);
  cy.get('#distance').select(String(restaurantAdd.distance));

  if (restaurantAdd.description) cy.get('#description').type(restaurantAdd.description);
  if (restaurantAdd.url) cy.get('#url').type(restaurantAdd.url);

  cy.get('#modal-add').click();
});
