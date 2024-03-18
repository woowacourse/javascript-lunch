declare namespace Cypress {
  interface Chainable {
    fillOutRestaurantForm(restaurant: RestaurantFormProps): Chainable<JQuery<HTMLElement>>;
  }
}
