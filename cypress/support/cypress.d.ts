interface RestaurantFormData {
  name: string;
  category: string;
  distance: string;
  description?: string;
  link?: string;
}

declare namespace Cypress {
  interface Chainable {
    fillOutRestaurantForm(restaurant: RestaurantFormData): Chainable<JQuery<HTMLElement>>;
    addRestaurantItems(restaurants: RestaurantFormData[]): Chainable<JQuery<HTMLElement>>;
  }
}
