import { CATEGORY_IMAGE_PATH } from '../../constant';
import { Restaurant } from '../../type';

type RestaurantItemType = {
  parentElement: HTMLElement;
  restaurant: Restaurant;
};

class RestaurantItem {
  #parentElement;
  #restaurant;

  constructor({ parentElement, restaurant }: RestaurantItemType) {
    this.#parentElement = parentElement;
    this.#restaurant = restaurant;

    this.#render();
  }

  #render() {
    const element = `
      <li class="restaurant">
        <div class="restaurant__category">
          <img
            src="${
              CATEGORY_IMAGE_PATH[this.#restaurant.category] ||
              CATEGORY_IMAGE_PATH['기타']
            }"
            alt="${this.#restaurant.category}"
            class="category-icon"
          />
        </div>
        <div class="restaurant__info">
          <h3 class="restaurant__name text-subtitle">${
            this.#restaurant.name
          }</h3>
          <span class="restaurant__distance text-body"
            >캠퍼스부터 ${this.#restaurant.distanceInMinutes}분 내</span
          >
          <p class="restaurant__description text-body">
            ${this.#restaurant.description}
          </p>
        </div>
      </li>
    `;

    if (this.#parentElement) {
      this.#parentElement.insertAdjacentHTML(
        'beforeEnd' as InsertPosition,
        element
      );
    }
  }
}

export default RestaurantItem;
