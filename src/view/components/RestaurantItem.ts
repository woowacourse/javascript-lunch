import { CATEGORY_IMG_PATH } from '../../constant';
import { Restaurant } from '../../type/common';

class RestaurantItem {
  #target;

  constructor($target: Element) {
    this.#target = $target;
  }

  #template(restaurant: Restaurant) {
    return `
      <li class="restaurant">
        <div class="restaurant__category">
          <img src="${
            CATEGORY_IMG_PATH[restaurant.category]
          }" alt="한식" class="category-icon">
        </div>
        <div class="restaurant__info">
          <h3 class="restaurant__name text-subtitle">${restaurant.name}</h3>
          <span class="restaurant__distance text-body">캠퍼스부터 ${
            restaurant.distance
          }분 내</span>
          <p class="restaurant__description text-body">${
            restaurant.description
          }</p>
        </div>
      </li>
    `;
  }

  render(restaurant: Restaurant) {
    this.#target.innerHTML += this.#template(restaurant);
  }
}

export default RestaurantItem;
