customElements.define(
  'restaurant-list',
  class RestaurantList extends HTMLElement {
    constructor() {
      super();
    }

    render(restaurants) {
      this.innerHTML = /* html */ `
      <ul class="restaurant-list">
      ${restaurants
        .map(
          (restaurant) => /* html */ `
          <restaurant-list-item
            restaurantID="${restaurant.restaurantID}"
            category="${restaurant.category}"
            restaurantName="${restaurant.name}"
            distance="${restaurant.distance}"
            description="${restaurant.description}"
            favorite=${restaurant.favorite}
          ></restaurant-list-item>
        `
        )
        .join('')}
      </ul>`;
    }
  }
);
