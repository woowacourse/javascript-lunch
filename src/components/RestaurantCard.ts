import { getCategoryImage } from "../constants/categoryImage";
import type { Restaurant } from "../types/restaurant";

class RestaurantCard extends HTMLLIElement {
  static get observedAttributes() {
    return ["data-restaurant"];
  }

  constructor() {
    super();
  }

  connectedCallback() {
    const restaurantData = this.getAttribute("data-restaurant");

    this.render(restaurantData);
  }

  render(restaurantData: string | null) {
    if (restaurantData === null) return;

    const restaurant: Restaurant = JSON.parse(restaurantData);

    this.innerHTML = `
      <div class="restaurant__category">
        <img
          src=${getCategoryImage(restaurant.category)}
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

  attributeChangedCallback(
    attName: string,
    oldValue: string | null,
    newValue: string | null
  ) {
    if (attName !== "data-restaurant") return;
    if (oldValue === newValue) return;

    this.render(newValue);
  }
}

export default RestaurantCard;
