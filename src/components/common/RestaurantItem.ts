import { Category, Restaurant } from "../../types/type";
import { categoryToSrc } from "../../utils/convertor";
import Bookmark from "./Bookmark";

class RestaurantItem {
  restaurant: Restaurant;
  bookmark: Bookmark;

  constructor(restaurant: Restaurant) {
    this.restaurant = restaurant;
    const bookmark = new Bookmark(this.restaurant);
    this.bookmark = bookmark;
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
      ${this.bookmark.template()}
    </li>`;
  }
}

export default RestaurantItem;
