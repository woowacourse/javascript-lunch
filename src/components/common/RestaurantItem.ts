import { Category, Restaurant } from "../../types/type";
import { categoryToSrc } from "../../utils/convertor";

class RestaurantItem {
  restaurant: Restaurant;

  constructor(restaurant: Restaurant) {
    this.restaurant = restaurant;
  }

  template() {
    return `
    <li class="restaurant" data-id="${this.restaurant.id}">
      <div class="restaurant__content">
        <div class="restaurant__category">
          <img src=${categoryToSrc(<Category>this.restaurant.category)} alt=${
      this.restaurant.category
    } class="category-icon">
        </div>
      <div class="restaurant__info">
        <h3 class="restaurant__name text-subtitle">${this.restaurant.name}</h3>
        <span class="restaurant__distance text-body">캠퍼스부터 ${
          this.restaurant.takingTime
        }분 내</span>
        <p class="restaurant__description text-body">${
          this.restaurant.description
        }</p>
      </div>
      </div>
      <button class="restaurant__bookmark">${
        this.restaurant.bookMark ? "★" : "✩"
      }</button>
    </li>`;
  }
}

export default RestaurantItem;
