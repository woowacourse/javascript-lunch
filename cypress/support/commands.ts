import { CategoryType, DistanceType } from '@/lib/types';

type RestaurantAddType = {
  name: string;
  category: CategoryType;
  distance: DistanceType;
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
  cy.get('[data-action="restaurant-add"]').click();
  cy.get('[data-action="category"]').select(restaurantAdd.category);
  cy.get('[data-action="name"]').type(restaurantAdd.name);
  cy.get('[data-action="distance"]').select(String(restaurantAdd.distance));

  if (restaurantAdd.description) cy.get('[data-action="description"]').type(restaurantAdd.description);
  if (restaurantAdd.url) cy.get('[data-action="url"]').type(restaurantAdd.url);

  cy.get('[data-action="modal-add"]').click();
});
