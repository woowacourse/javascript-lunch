import { $ } from "../utils/Dom";
import { CATEGORY } from "../constants";

export default class RestaurantItem {
  template = (restaurantInfo) => `
  <li class="restaurant">
        <div class="restaurant__category">
          <img src="${CATEGORY[restaurantInfo.category]}" alt="${
    restaurantInfo.category
  }" class="category-icon">
        </div>
        <div class="restaurant__info">
          <h3 class="restaurant__name text-subtitle">${restaurantInfo.name}</h3>
          <span class="restaurant__distance text-body">캠퍼스로부터 ${
            restaurantInfo.distance
          }분 내</span>
          <p class="restaurant__description text-body">${
            restaurantInfo.description
          }</p>
        </div>
  </li>
  `;

  render(restaurantInfo) {
    const restaurantList = $(".restaurant-list");
    restaurantList.insertAdjacentHTML(
      "beforeend",
      this.template(restaurantInfo)
    );
  }
}
