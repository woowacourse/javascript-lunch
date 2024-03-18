interface RestaurantFormData {
  name: string;
  category: string;
  distance: string;
  description?: string;
  link?: string;
}

Cypress.Commands.add('fillOutRestaurantForm', ({ name, category, distance, description, link }) => {
  cy.get('[data-cy=category]').find('select').select(category);
  cy.get('[data-cy=name]').find('input').type(name);
  cy.get('[data-cy=distances]').find('select').select(distance);
  if (description) cy.get('[data-cy="description"]').find('textarea').type(description);
  if (link) cy.get('[data-cy="link"]').find('input').type(link);
});

Cypress.Commands.add('addRestaurantItems', (restaurants) => {
  restaurants.forEach((restaurant) => {
    cy.get('[data-cy="add-button"]').click();

    cy.fillOutRestaurantForm(restaurant);
    cy.get('[data-cy="submit"]').click();
  });
});
