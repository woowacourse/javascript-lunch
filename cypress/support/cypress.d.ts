declare namespace Cypress {
  interface Chainable {
    fillOutRestaurantForm(restaurant: RestaurantFormData): Chainable<JQuery<HTMLElement>>;
    addRestaurantItems(restaurants: RestaurantFormData[]): Chainable<JQuery<HTMLElement>>;
  }
}
