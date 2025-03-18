import { CreateRestaurantList } from "./ui/CreateRestaurantList";
import HeaderCategory from "./ui/HeaderCategory";
import { GetAllRestaurants } from "./domain/RestaurantService";

export default function InitRestaurantList() {
  const $allButton = document.getElementById("all-button");

  if (!$allButton) return;
  $allButton.classList.add("active");

  const restaurants = GetAllRestaurants();
  CreateRestaurantList(restaurants);

  HeaderCategory();
}
