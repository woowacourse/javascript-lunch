import { IRestaurantInfo } from '../domain/Restaurant';

const IMG_CATEGORY = Object.freeze({
  한식: 'korean',
  아시안: 'asian',
  중식: 'chinese',
  기타: 'etc',
  양식: 'western',
  일식: 'japanese',
});

class RestaurantCard extends HTMLLIElement {
  #restaurant;

  constructor(restaurant: IRestaurantInfo) {
    super();
    this.#restaurant = restaurant;
  }

  connectedCallback() {
    this.#appendRestaurantElement(this.#restaurant);
  }

  #appendRestaurantElement(restaurant: IRestaurantInfo) {
    this.classList.add('restaurant-container');
    this.innerHTML = this.#generateRestaurantElementTemplate(restaurant);
  }

  #generateRestaurantElementTemplate(restaurant: IRestaurantInfo) {
    const categoryKey = restaurant.category as keyof typeof IMG_CATEGORY;
    return `
    <div class="restaurant">
      <div class="restaurant__category">
        <img src="./assets/category-${IMG_CATEGORY[categoryKey]}.png" alt="${restaurant.category}" class="category-icon">
      </div>
      <div class="restaurant__info">
        <h3 class="restaurant__name text-subtitle">${restaurant.name}</h3>
        <span class="restaurant__distance text-body">캠퍼스부터 ${restaurant.distanceFromCampus}분 내</span>
        <p class="restaurant__description text-body">${restaurant.description}</p>
      </div>
    </div>

  `;
  }
}

export default RestaurantCard;
