import { restaurants } from '../domain/restaurants';

customElements.define(
  'restaurant-list',
  class RestaurantList extends HTMLElement {
    constructor() {
      super();

      const { list } = restaurants;

      this.innerHTML = `
      <ul class="restaurant-list">
      ${list
        .map(
          (restaurant) => `
          <restaurant-list-item
            category="${restaurant.category}"
            restaurantName="${restaurant.name}"
            distance="${restaurant.distance}"
            description="${restaurant.description}"
          ></restaurant-list-item>
        `,
        )
        .join('')}
      </ul>`;
    }
  },
);
