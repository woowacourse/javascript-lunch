import type { Restaurant } from "../../types/type";

class Bookmark {
  restaurant: Restaurant;

  constructor(restaurant: Restaurant) {
    this.restaurant = restaurant;
  }

  template() {
    return `
    <button class="restaurant__bookmark">${
      this.restaurant.bookmark
        ? "<img src='./favorite-icon-filled.png'>"
        : "<img src='./favorite-icon-lined.png'>"
    }</button>
    `;
  }
}

export default Bookmark;
