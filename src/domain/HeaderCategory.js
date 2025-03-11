import { createRestaurantList } from "../components/createRestaurantList";
import { DEFAULT_RESTAURANTS } from "../constants/options";
import { GetAllRestaurants, GetFavoriteRestaurant } from "./RestaurantStorage";

export default function HeaderCategory() {
  const $allButton = document.getElementById("all-button");
  const $favoriteButton = document.getElementById("favorite-button");
  const $restaurantList = document.querySelector(".restaurant-list");

  $allButton.addEventListener("click", (e) => {
    $allButton.classList.add("active");
    $favoriteButton.classList.remove("active");

    const restaurants = GetAllRestaurants();
    createRestaurantList(restaurants);
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

    createRestaurantList(favoriteList);
  });
}
