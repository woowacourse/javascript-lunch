import { Category, Restaurant } from "../../types/type";
import { categoryToSrc } from "../../utils/convertor";
import BookMark from "./BookMark";

class RestaurantItem {
  restaurant: Restaurant;
  bookMark: BookMark;

  constructor(restaurant: Restaurant) {
    this.restaurant = restaurant;
    const bookMark = new BookMark(this.restaurant);
    this.bookMark = bookMark;
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
      ${this.bookMark.template()}
    </li>`;
  }
}

export default RestaurantItem;
