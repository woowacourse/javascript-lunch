import { RestaurantType } from "../type";
import { $ } from "../util/selector";
import { CATEGORY_IMAGE } from "../constant/imageConstant";

export const renderRestaurant = (info: RestaurantType) => {
  return `<li class="restaurant">
    <div class="restaurant__category">
      <img
        src="./category-${CATEGORY_IMAGE[info.category]}.png"
        alt="${info.category}"
        class="category-icon"/>
    </div>
    <div class="restaurant__info">
      <h3 class="restaurant__name text-subtitle">${info.name}</h3>
      <span class="restaurant__distance text-body">
        캠퍼스부터 ${info.distance}분 내
      </span>
      <p class="restaurant__description text-body">${info.description}</p>
    </div>
  </li>`;
};

export const combineAllRestaurants = (restaurantList: RestaurantType[]) => {
  return restaurantList
    .map((restaurant: RestaurantType) => renderRestaurant(restaurant))
    .join("");
};

export const renderRestaurantList = (restaurantList: RestaurantType[]) => {
  const restaurantListElement = $(".restaurant-list-container") as HTMLElement;

  restaurantListElement.innerHTML = `
  <ul class="restaurant-list">${combineAllRestaurants(restaurantList)}</ul>
  `;
};
