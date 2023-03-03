import { $ } from "../utils/domSelectors";
import createRestaurantItem from "./RestaurantItem";
import { Restaurant } from "../domains/types";

const restaurantList = $(".restaurant-list") as HTMLUListElement;

function renderList(sortedRestaurants: Restaurant[]) {
  restaurantList.innerHTML = "";
  const restaurantItems = sortedRestaurants.map((restaurant) =>
    createRestaurantItem(restaurant)
  );
  restaurantList.insertAdjacentHTML("beforeend", restaurantItems.join(""));
}

export default renderList;
