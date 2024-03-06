import { Restaurant as RestaurantType } from '../types/index';

class Restaurant extends HTMLElement {
  constructor(restaurant: RestaurantType) {
    super();

    const { category, name, distance, introduction } = restaurant;
    this.innerHTML = `
    <li class="restaurant">
      <div class="restaurant__category">
        <img src="./category-korean.png" alt="${category}" class="category-icon">
      </div>
      <div class="restaurant__info">
        <h3 class="restaurant__name text-subtitle">${name}</h3>
        <span class="restaurant__distance text-body">캠퍼스부터 ${distance}분 내</span>
        <p class="restaurant__description text-body">${introduction}</p>
      </div>
    </li>
    `;
  }
}

customElements.define('restaurant-list-container', Restaurant);

export default Restaurant;
