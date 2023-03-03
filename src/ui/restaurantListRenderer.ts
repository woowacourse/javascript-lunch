import { RestaurantType } from "../type";
import { renderRestaurant } from "../templates";
import { $ } from "../util/selector";

import "../img/add-button.png";
import "../img/category-chinese.png";
import "../img/category-asian.png";
import "../img/category-etc.png";
import "../img/category-japanese.png";
import "../img/category-korean.png";
import "../img/category-western.png";
import "../img/favorite-icon-filled.png";
import "../img/favorite-icon-lined.png";

const restaurantListElement = $(".restaurant-list") as HTMLElement;

export const renderRestaurantList = (restaurantList: RestaurantType[]) => {
  restaurantListElement.innerHTML = restaurantList
    .map((restaurant: RestaurantType) => renderRestaurant(restaurant))
    .join("");
};

export const renderNewRestaurant = (restaurant: RestaurantType) => {
  restaurantListElement.insertAdjacentHTML(
    "beforeend",
    renderRestaurant(restaurant)
  );
};
