import { CreateRestaurantList } from "./components/CreateRestaurantList";
import HeaderCategory from "./domain/HeaderCategory";
import { GetAllRestaurants } from "./domain/RestaurantStorage";

export default function InitRestaurantList() {
  const $allButton = document.getElementById("all-button") as HTMLElement;
  $allButton.classList.add("active");

  const restaurants = GetAllRestaurants();
  CreateRestaurantList(restaurants);

  HeaderCategory();
}
