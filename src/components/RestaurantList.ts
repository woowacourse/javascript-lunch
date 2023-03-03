import { $ } from "../utils/domSelectors";
import createRestaurantItem from "./RestaurantItem";
import { Restaurant } from "../types/types";

function renderList(sortedRestaurants: Restaurant[]) {
  const restaurantList = $(".restaurant-list") as HTMLUListElement;
  restaurantList.innerHTML = "";
  const restaurantItems = sortedRestaurants.map((restaurant) =>
    createRestaurantItem(restaurant)
  );
  restaurantList.insertAdjacentHTML("beforeend", restaurantItems.join(""));
}

export default renderList;
