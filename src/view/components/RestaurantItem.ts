import { Restaurant } from '../../type/common';

type RestaurantItemProps = {
  $target: HTMLElement;
  restaurant: Restaurant;
};

const categoryImgPath = {
  한식: './category-korean.png',
  중식: './category-chinese.png',
  양식: './category-western.png',
  일식: './category-japanese.png',
  아시안: './category-asian.png',
  기타: './category-etc.png',
};

class RestaurantItem {
  #target;
  #restaurant;

  constructor({ $target, restaurant }: RestaurantItemProps) {
    this.#target = $target;
    this.#restaurant = restaurant;

    this.#render();
  }

  #template() {
    return `
      <li class="restaurant">
        <div class="restaurant__category">
        <img
          src="${categoryImgPath[this.#restaurant.category]}"
          alt="${this.#restaurant.category}"
          class="category-icon"
        />
        </div>
        <div class="restaurant__info">
        <h3 class="restaurant__name text-subtitle">${this.#restaurant.name}</h3>
        <span class="restaurant__distance text-body"
          >캠퍼스부터 ${this.#restaurant.distance}분 내</span
        >
        <p class="restaurant__description text-body">
          ${this.#restaurant.description}
        </p>
        </div>
      </li>
    `;
  }

  #render() {
    this.#target.innerHTML += this.#template();
  }
}

export default RestaurantItem;
