import { IRestaurant } from "../types/Restaurant";

const CATEGORY_IMAGE = {
  한식: "./category-korean.png",
  중식: "./category-chinese.png",
  일식: "./category-japanese.png",
  양식: "./category-western.png",
  아시안: "./category-asian.png",
  기타: "./category-etc.png",
};

export function createRestaurantItem(
  restaurant: IRestaurant,
  onClick: Function
) {
  const restaurantItem = document.createElement("li");
  restaurantItem.addEventListener("click", () => onClick?.(restaurant));

  const { category, name, distance, description } = restaurant;
  restaurantItem.classList.add("restaurant");
  restaurantItem.innerHTML = /*html*/ `
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

  return restaurantItem;
}

export function updateRestaurantItem(
  element: HTMLElement,
  { category, name, distance, description }: IRestaurant
) {
  element.innerHTML = /*html*/ `
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
