import { RestaurantType } from "../type";
import { renderRestaurant } from "../templates";
import { $ } from "../util/selector";

const restaurantListElement = $(".restaurant-list") as HTMLElement;

export const renderRestaurantList = (
  restaurantList: RestaurantType[]
) => {
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
