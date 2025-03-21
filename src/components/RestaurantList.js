import { restaurantStore } from "../store/restaurantStore";
import RestaurantItem from "./RestaurantItem.js";

export default function RestaurantList(
  container,
  restaurants = restaurantStore.getRestaurants(),
) {
  const render = () => {
    const $restaurantList = document.createElement("ul");
    $restaurantList.className = "restaurant-list";

    const restaurantItemsHTML = restaurants
      .map((restaurant) => RestaurantItem(restaurant))
      .join("");

    $restaurantList.innerHTML = restaurantItemsHTML;
    container.appendChild($restaurantList);
  };

  render();
}
