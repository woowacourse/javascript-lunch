import RestaurantType from "../type/Restaurant";
import { favoriteIconFilled, favoriteIconLined } from "../assets/";
import { findImage } from "../utils";

class RestaurantItem {
  render(restaurant: RestaurantType) {
    return `
      <li class="restaurant">
        <div class="restaurant__category">
          <img src="${findImage(restaurant.category)}" alt="${
      restaurant.category
    }" class="category-icon">
        </div>
        <div id="restaurantInfo" class="restaurant__info">
          <h3 class="restaurant__name text-subtitle">${restaurant.name}</h3>
          <span class="restaurant__distance text-body">캠퍼스부터 ${
            restaurant.distance
          }분 내</span>
          <p class="restaurant__description text-body">${
            restaurant.description
          }</p>
        </div>
        <img id="favorite" src="${
          restaurant.isFavorite ? favoriteIconFilled : favoriteIconLined
        }" alt="favorite">
      </li>
    `;
  }
}

export default RestaurantItem;
