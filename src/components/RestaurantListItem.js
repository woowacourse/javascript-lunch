import { RESTAURANT_CATEGORY_ICONS } from '../icons/category';
import { FAVORITE_ICON_FILLED, FAVORITE_ICON_LINED } from '../icons/favorite';

customElements.define(
  'restaurant-list-item',
  class RestaurantListItem extends HTMLElement {
    constructor() {
      super();

      const category = this.getAttribute('category');
      const restaurantName = this.getAttribute('restaurantName');
      const distance = this.getAttribute('distance');
      const isFavorite = JSON.parse(this.getAttribute('isFavorite'));

      const description = this.innerHTML;

      this.innerHTML = /* html */ `
      <li class="restaurant">
        <div class="restaurant__category">
          ${RESTAURANT_CATEGORY_ICONS[category]}
        </div>
        <div class="restaurant__info">
          <div class="flex">
            <div>
              <h2 class="restaurant__name text-subtitle">${restaurantName}</h2>
              <span class="restaurant__distance text-body">캠퍼스부터 ${distance}분 내</span>
            </div>
            <button class="favorite" aria-label="자주 가는 음식점 등록">
              ${isFavorite ? FAVORITE_ICON_FILLED : FAVORITE_ICON_LINED}
            </button>
          </div>
          <p class="restaurant__description text-body">${description}</p>
        </div>
      </li>`;
    }
  }
);
