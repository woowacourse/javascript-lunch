import { GetAllRestaurants } from "./domain/RestaurantStorage";
import HeaderCategory from "./domain/HeaderCategory";
import { CreateRestaurantList } from "./components/CreateRestaurantList";

export default function InitRestaurantList() {
  const $allButton = document.getElementById("all-button") as HTMLElement;
  $allButton.classList.add("active");

  const restaurants = GetAllRestaurants();
  CreateRestaurantList(restaurants);

  HeaderCategory();
}
