import { CreateRestaurantList } from "./components/CreateRestaurantList";
import { GetAllRestaurants } from "./domain/RestaurantStorage";
import HeaderCategory from "./domain/HeaderCategory";

export default function InitRestaurantList() {
  const $allButton = document.getElementById("all-button");
  $allButton.classList.add("active");

  const restaurants = GetAllRestaurants();
  CreateRestaurantList(restaurants);

  HeaderCategory();
}
