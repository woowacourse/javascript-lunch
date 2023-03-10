import { RestaurantIconCategory } from '../domain/constants';

customElements.define(
  'restaurant-list-item',
  class RestaurantListItem extends HTMLElement {
    constructor() {
      super();

      const category = this.getAttribute('category');
      const restaurantName = this.getAttribute('restaurantName');
      const distance = this.getAttribute('distance');
      const description = this.getAttribute('description');
      const isFavorite = JSON.parse(this.getAttribute('isFavorite'));

      this.innerHTML = /* html */ `
      <li class="restaurant">
        <div class="restaurant__category">
          <img src="./category-${
            RestaurantIconCategory[category]
          }.png" alt="${category}" class="category-icon" />
        </div>
        <div class="restaurant__info">
          <div class="flex">
            <div>
              <h3 class="restaurant__name text-subtitle">${restaurantName}</h3>
              <span class="restaurant__distance text-body">캠퍼스부터 ${distance}분 내</span>
            </div>
            <button class="favorite">
              <img src="./favorite-icon-${
                isFavorite ? 'filled' : 'lined'
              }.png" alt="favorite" class="favorite-icon" />
            </button>
          </div>
          <p class="restaurant__description text-body">${description}</p>
        </div>
      </li>`;
    }
  }
);
