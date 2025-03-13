import { IRestaurant } from "../types/Restaurant";

const CATEGORY_IMAGE = {
  한식: "./category-korean.png",
  중식: "./category-chinese.png",
  일식: "./category-japanese.png",
  양식: "./category-western.png",
  아시안: "./category-asian.png",
  기타: "./category-etc.png",
};

export default class RestaurantItem {
  #restaurant?: IRestaurant;
  #restaurantItem = document.createElement("li");
  #onClick?: (restaurant?: RestaurantItem) => any;
  isDetail = false;

  constructor(
    restaurant: IRestaurant,
    onClick: (restaurant?: RestaurantItem) => any,
    isDetail = false
  ) {
    this.#restaurant = restaurant;
    this.#onClick = onClick;
    this.isDetail = isDetail;

    this.#restaurantItem.addEventListener("click", () => {
      this.#onClick?.(this);
    });
  }

  update(restaurant: IRestaurant) {
    this.#restaurant = restaurant;

    const { category, name, distance, description } = restaurant;
    this.#restaurantItem.innerHTML = /*html*/ `
    <div class="restaurant__category">
      <img
        src="${CATEGORY_IMAGE[category] || "./category-etc.png"}"
        alt="${category}"
        class="category-icon"
      />
    </div>
    <div class="restaurant__info">
      <h3 class="restaurant__name text-subtitle">${name}</h3>
      <span class="restaurant__distance text-body"
        >캠퍼스부터 ${distance}분 내</span
      >
      <p class="restaurant__description text-body">
        ${description}
      </p>
    </div>
  `;
  }

  get restaurant() {
    return this.#restaurant;
  }

  get element() {
    const { category, name, distance, description } = this
      .#restaurant as IRestaurant;

    if (this.isDetail) {
      this.#restaurantItem.classList.add("flex-column");
    }

    this.#restaurantItem.classList.add("restaurant");
    this.#restaurantItem.innerHTML = /*html*/ `
    <div class="restaurant__category">
      <img
        src="${CATEGORY_IMAGE[category] || "./category-etc.png"}"
        alt="${category}"
        class="category-icon"
      />
    </div>
    <div class="restaurant__info">
      <h3 class="restaurant__name text-subtitle">${name}</h3>
      <span class="restaurant__distance text-body"
        >캠퍼스부터 ${distance}분 내</span
      >
      <p class="restaurant__description text-body">
        ${description}
      </p>
    </div>
  `;

    return this.#restaurantItem;
  }
}
