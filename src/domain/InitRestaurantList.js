import { createRestaurantItem } from "../components/createRestaurantItem";
import { DEFAULT_RESTAURANTS } from "../constants/options";

export default function InitRestaurantList() {
  const $restaurantList = document.querySelector(".restaurant-list");
  DEFAULT_RESTAURANTS.map((restaurant) =>
    createRestaurantItem($restaurantList, restaurant)
  );
}
