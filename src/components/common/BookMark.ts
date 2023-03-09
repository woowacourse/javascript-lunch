import { Restaurant } from "../../types/type";

class BookMark {
  restaurant: Restaurant;

  constructor(restaurant: Restaurant) {
    this.restaurant = restaurant;
  }

  template() {
    return `
    <button class="restaurant__bookmark">${
      this.restaurant.bookMark
        ? "<img src='./favorite-icon-filled.png'>"
        : "<img src='./favorite-icon-lined.png'>"
    }</button>
    `;
  }
}

export default BookMark;
