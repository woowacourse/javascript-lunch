import { DEFAULT_RESTAURANTS } from "../constants/options";
import { createDefaultRestaurantItem } from "./createRestaurantItem";

export default function RestaurantList(container) {
  container.innerHTML += `
  <ul class="restaurant-list">
  ${DEFAULT_RESTAURANTS.map((restaurant) =>
    createDefaultRestaurantItem(restaurant)
  ).join("")}
  </ul>
  `;
}
