import { CreateRestaurantList } from "../components/CreateRestaurantList";
import { GetAllRestaurants } from "./RestaurantStorage";
import FilterByValue from "./FilterByValue";
import OrderByValue from "./OrderByValue";

export default function HeaderCategory() {
  const $allButton = document.getElementById("all-button");
  const $favoriteButton = document.getElementById("favorite-button");
  const $restaurantList = document.querySelector(".restaurant-list");
  FilterByValue();
  OrderByValue();

  const restaurants = GetAllRestaurants();
  const favoriteList = restaurants.filter(
    (restaurant) => restaurant.favorite === true
  );

  $allButton.addEventListener("click", (e) => {
    $allButton.classList.add("active");
    $favoriteButton.classList.remove("active");

    CreateRestaurantList(restaurants);
    location.reload();
  });

  $favoriteButton.addEventListener("click", (e) => {
    $favoriteButton.classList.add("active");
    $allButton.classList.remove("active");

    const $restaurantFilterContainer = document.querySelector(
      ".restaurant-filter-container"
    );
    $restaurantFilterContainer.classList.add("active");

    CreateRestaurantList(favoriteList);
  });
}
