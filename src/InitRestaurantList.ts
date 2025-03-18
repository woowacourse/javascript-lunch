import { CreateRestaurantList } from "./components/CreateRestaurantList";
import HeaderCategory from "./components/HeaderCategory";
import { GetAllRestaurants } from "./domain/RestaurantService";

export default function InitRestaurantList() {
  const $allButton = document.getElementById("all-button");

  if (!$allButton) return;
  $allButton.classList.add("active");

  const restaurants = GetAllRestaurants();
  CreateRestaurantList(restaurants);

  HeaderCategory();
}
