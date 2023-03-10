import { CATEGORY_IMAGE_PATH, FAVORITE_IMAGE_PATH } from '../../constant';
import { Restaurant } from '../../type';
import { $ } from '../../util/querySelector';

type RestaurantItemType = {
  parentElement: HTMLElement;
  restaurant: Restaurant;
  parentEvent?: {
    onItemClicked?: (itemId: number) => void;
    onFavoriteButtonClicked?: (itemId: number) => void;
  };
};

class RestaurantItem {
  #parentElement;
  #restaurant;
  #parentEvent;

  constructor({ parentElement, restaurant, parentEvent }: RestaurantItemType) {
    this.#parentElement = parentElement;
    this.#restaurant = restaurant;
    this.#parentEvent = parentEvent;

    this.#render();
    this.#setListeners();
    this.#removeTemporaryIds();
  }

  #render() {
    const template = `
      <li class="restaurant" ${
        typeof this.#restaurant.itemId === 'number'
          ? `id="restaurant-${this.#restaurant.itemId}"`
          : ''
      }>
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
        <button class="favorite-button" ${
          typeof this.#restaurant.itemId === 'number'
            ? `id="favorite-${this.#restaurant.itemId}"`
            : ''
        }>
          <img src="${
            this.#restaurant.isFavorite
              ? FAVORITE_IMAGE_PATH.starred
              : FAVORITE_IMAGE_PATH.unstarred
          }" class="favorite-icon" />
        </button>
        <div class="restaurant__info">
          <h3 class="restaurant__name text-subtitle">${
            this.#restaurant.name
          }</h3>
          <span class="restaurant__distance text-body"
            >캠퍼스부터 ${this.#restaurant.distanceInMinutes}분 내</span
          >
          <p class="restaurant__description text-body">${
            this.#restaurant.description
          }</p>
          <a class="restaurant__link" href="${
            this.#restaurant.link
          }" target="__blank">${this.#restaurant.link}</a>
        </div>
      </li>
    `;

    if (this.#parentElement) {
      this.#parentElement.insertAdjacentHTML(
        'beforeEnd' as InsertPosition,
        template
      );
    }
  }

  #setListeners() {
    if (typeof this.#restaurant.itemId === 'number') {
      $(`#restaurant-${this.#restaurant.itemId}`).addEventListener(
        'click',
        () => {
          if (
            this.#parentEvent !== undefined &&
            this.#parentEvent.onItemClicked !== undefined
          ) {
            this.#parentEvent.onItemClicked(this.#restaurant.itemId);
          }
        }
      );

      $(`#favorite-${this.#restaurant.itemId}`).addEventListener(
        'click',
        (event) => {
          event.stopPropagation();

          if (
            this.#parentEvent !== undefined &&
            this.#parentEvent.onFavoriteButtonClicked !== undefined
          ) {
            this.#parentEvent.onFavoriteButtonClicked(this.#restaurant.itemId);
          }
        }
      );
    }
  }

  #removeTemporaryIds() {
    $(`#restaurant-${this.#restaurant.itemId}`).removeAttribute('id');
    $(`#favorite-${this.#restaurant.itemId}`).removeAttribute('id');
  }
}

export default RestaurantItem;
