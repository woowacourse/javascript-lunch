import { RestaurantType } from "../type";
import { $ } from "../util/selector";
import { CATEGORY_IMAGE, FAVORITE_IMAGE } from "../constant/imageConstant";
import { FAVORITE_ALT } from "../constant";
import { updateRestaurants } from "../domain/filter";
import { initRestaurantInfoModal } from "../modal/restaurantInfoModal";

// UI
const renderTemplate = (info: RestaurantType) => {
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
      <img src="./favorite-icon-${FAVORITE_IMAGE[info.favorite]}.png" alt="${
    FAVORITE_ALT[info.favorite]
  }" class="favorite-icon" />
      <p class="restaurant__description text-body">${info.description}</p>
    </div>
  </li>`;
};

const combineAllRestaurants = (restaurantList: RestaurantType[]) => {
  return restaurantList
    .map((restaurant: RestaurantType) => renderTemplate(restaurant))
    .join("");
};

export const renderRestaurants = (restaurantList: RestaurantType[]) => {
  const restaurantListElement = $(".restaurant-list-container") as HTMLElement;

  restaurantListElement.innerHTML = `
  <ul class="restaurant-list">${combineAllRestaurants(restaurantList)}</ul>
  `;
};

// Domain
export const updateAndInitRestaurants = () => {
  updateRestaurants();
  initRestaurantInfoModal();
};
