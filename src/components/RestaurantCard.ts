import "./RestaurantCard.style.css";

import type { Restaurant } from "../types/restaurant";

import categoryImages from "../constants/categoryImage";

class RestaurantCard extends HTMLLIElement {
  constructor() {
    super();
  }

  render(restaurant: Restaurant) {
    this.innerHTML = `
      <div class="restaurant__category">
        <img
          src=${categoryImages[restaurant.category]}
          alt=${restaurant.category}
          class="category-icon"
        />
      </div>
      <div class="restaurant__info">
        <h3 class="restaurant__name text-subtitle">${restaurant.name}</h3>
        <span class="restaurant__distance text-body">
          캠퍼스부터 ${restaurant.distance}분 내
        </span>
        <p class="restaurant__description text-body">
          ${restaurant.description ?? ""}
        </p>
      </div>
    `;
  }
}

export default RestaurantCard;
