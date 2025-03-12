import { CreateRestaurantList } from "./components/CreateRestaurantList";
import HeaderCategory from "./domain/HeaderCategory";
import { GetAllRestaurants } from "./domain/RestaurantStorage";

export default function InitRestaurantList() {
  const $allButton = document.getElementById("all-button");
  $allButton.classList.add("active");

  const restaurants = GetAllRestaurants();
  CreateRestaurantList(restaurants);

  HeaderCategory();
}
