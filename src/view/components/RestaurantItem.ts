import { CATEGORY_IMAGE_PATH } from '../../constant';
import { Restaurant } from '../../type';
import { $ } from '../../util/querySelector';

type RestaurantItemType = {
  parentElement: HTMLElement;
  restaurant: Restaurant;
  index?: number;
  parentEvent?: {
    onItemClicked: (index: number) => void;
  };
};

class RestaurantItem {
  #parentElement;
  #restaurant;
  #index;
  #parentEvent;

  constructor({
    parentElement,
    restaurant,
    index,
    parentEvent,
  }: RestaurantItemType) {
    this.#parentElement = parentElement;
    this.#restaurant = restaurant;
    this.#index = index;
    this.#parentEvent = parentEvent;

    this.#render();
    this.#setListeners();
  }

  #render() {
    const element = `
      <li class="restaurant" id="restaurant-${this.#index}">
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
        <img src="./favorite-icon-lined.png" class="favorite-icon" />
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
          <a class="restaurant__link" href="${this.#restaurant.link}">${
      this.#restaurant.link
    }</a>
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

  #setListeners() {
    // MEMO: 타입가드 안 먹힘
    if (typeof this.#index === 'number' && this.#parentEvent) {
      $(`#restaurant-${this.#index}`).addEventListener('click', () => {
        this.#parentEvent?.onItemClicked(this.#index as number);
      });
    }
  }
}

export default RestaurantItem;
