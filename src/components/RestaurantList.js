import { DEFAULT_RESTAURANTS } from "../constants/options";
import { DefaultRestaurantItem } from "./RestaurantItem";

export default function RestaurantList(container) {
  container.innerHTML += `
  <ul class="restaurant-list">
  ${DEFAULT_RESTAURANTS.map((restaurant) =>
    DefaultRestaurantItem(restaurant)
  ).join("")}
  </ul>
  `;
}
