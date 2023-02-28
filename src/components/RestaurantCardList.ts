import type { Restaurant } from "../types/restaurant";
import createRestaurantCard from "./RestaurantCard";

const createRestaurantCardList = (restaurants: Restaurant[]) => `
  <ul class="restaurant-list">
    ${restaurants
      .map((restaurant) => createRestaurantCard(restaurant))
      .join("")}
  </ul>
`;

export default createRestaurantCardList;
