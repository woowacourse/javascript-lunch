import { createRestaurantList } from "./components/createRestaurantList";
import { DEFAULT_RESTAURANTS } from "./constants/options";
import HeaderCategory from "./domain/HeaderCategory";
import { GetAllRestaurants } from "./domain/RestaurantStorage";

export default function InitRestaurantList() {
  const $allButton = document.getElementById("all-button");
  $allButton.classList.add("active");

  const restaurants = GetAllRestaurants();
  createRestaurantList(restaurants);

  HeaderCategory();
}
