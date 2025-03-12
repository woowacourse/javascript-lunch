import { CreateRestaurantList } from "../components/CreateRestaurantList";
import { DEFAULT_RESTAURANTS } from "../constants/options";
import { GetAllRestaurants, GetFavoriteRestaurant } from "./RestaurantStorage";
import OrderByValue from "./OrderByValue";
import FilterByValue from "./FilterByValue";

export default function HeaderCategory() {
  const $allButton = document.getElementById("all-button");
  const $favoriteButton = document.getElementById("favorite-button");
  const $restaurantList = document.querySelector(".restaurant-list");
  FilterByValue();
  OrderByValue();

  $allButton.addEventListener("click", (e) => {
    $allButton.classList.add("active");
    $favoriteButton.classList.remove("active");

    const restaurants = GetAllRestaurants();
    CreateRestaurantList(restaurants);
    location.reload();
  });

  $favoriteButton.addEventListener("click", (e) => {
    $favoriteButton.classList.add("active");
    $allButton.classList.remove("active");
    const favoriteList = GetFavoriteRestaurant();

    const $restaurantFilterContainer = document.querySelector(
      ".restaurant-filter-container"
    );
    $restaurantFilterContainer.classList.add("active");

    CreateRestaurantList(favoriteList);
  });
}
