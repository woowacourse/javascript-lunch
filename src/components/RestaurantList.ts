import { $ } from "../utils/domSelectors";
import createRestaurantItem from "./RestaurantItem";
import { Restaurant } from "../domains/types";

const restaurantList = $(".restaurant-list");

function renderList(sortedRestaurants: Restaurant[]) {
  const restaurantItems = sortedRestaurants.map((restaurant) =>
    createRestaurantItem(restaurant)
  );
  restaurantList?.insertAdjacentHTML("beforeend", restaurantItems.join(""));
}

export default renderList;
