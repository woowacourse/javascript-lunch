import { RestaurantType } from "../type";
import RestaurantsController from "../domain/RestaurantsController";
import { renderRestaurant } from "../templates";
import { $ } from "../util/selector";

const restaurantListElement = $(".restaurant-list") as HTMLElement;

export const renderRestaurantList = (
  restaurantsController: RestaurantsController
) => {
  const allRestaurants = restaurantsController.getRestaurantList();

  restaurantListElement.innerHTML = allRestaurants
    .map((restaurant: RestaurantType) => renderRestaurant(restaurant))
    .join("");
};

export const renderNewRestaurant = (restaurant: RestaurantType) => {
  restaurantListElement.insertAdjacentHTML(
    "beforeend",
    renderRestaurant(restaurant)
  );
};
