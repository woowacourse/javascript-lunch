import { $ } from "../utils/Dom";

export default class RestaurantRegistry {
  appendRestaurant(restaurantInfo) {
    const template = `
    <li class="restaurant">
          <div class="restaurant__category">
            <img src="" alt="" class="category-icon">
          </div>
          <div class="restaurant__info">
            <h3 class="restaurant__name text-subtitle">${restaurantInfo.name}</h3>
            <span class="restaurant__distance text-body">${restaurantInfo.distance}</span>
            <p class="restaurant__description text-body">${restaurantInfo.description}</p>
          </div>
    </li>
    `;

    $(".restaurant-list").insertAdjacentHTML("beforeend", template);
  }
}
