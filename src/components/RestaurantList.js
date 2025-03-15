import { initialRestaurants } from "../data/initialRestaurants.js";
import RestaurantItem from "./RestaurantItem.js";

export default function RestaurantList(
  container,
  restaurants = initialRestaurants,
) {
  const restaurantItemsHTML = restaurants
    .map((restaurant) => RestaurantItem(restaurant))
    .join("");

  container.innerHTML += `
    <ul class="restaurant-list">
      ${restaurantItemsHTML}
    </ul>
  `;
}
