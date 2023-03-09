import type { Restaurant } from "../../types/restaurant";

export class RestaurantCardList extends HTMLUListElement {
  constructor() {
    super();
  }

  render(restaurants: Restaurant[]) {
    this.innerHTML = `
      ${restaurants
        .map(
          (restaurant) =>
            `<li 
              is="restaurant-card" 
              class="restaurant" 
              category=${restaurant.category} 
              name=${restaurant.name} 
              distance=${restaurant.distance} 
              description=${restaurant.description}
              like=${restaurant.like} 
        )
        .join("")}
    `;
  }
}

export const createRestaurantCardList = () => {
  customElements.define("restaurant-card-list", RestaurantCardList, {
    extends: "ul",
  });
};
