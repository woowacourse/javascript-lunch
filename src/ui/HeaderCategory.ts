import { CreateRestaurantList } from "./CreateRestaurantList";
import { GetAllRestaurants } from "../domain/RestaurantStorage";
import { Restaurant } from "../shared/types";
import FilteredRestaurant from "./FilteredRestaurant";
import SortedRestaurant from "./SortedRestaurant";

export default function HeaderCategory() {
  const $allButton = document.getElementById("all-button") as HTMLButtonElement;
  const $favoriteButton = document.getElementById(
    "favorite-button"
  ) as HTMLButtonElement;

  FilteredRestaurant();
  SortedRestaurant();

  const restaurants: Restaurant[] = GetAllRestaurants();
  const favoriteList = restaurants.filter((restaurant) => restaurant.favorite);

  $allButton.addEventListener("click", () => {
    updateUI({ $allButton, $favoriteButton, restaurants, isFavorite: false });
  });

  $favoriteButton.addEventListener("click", () => {
    updateUI({
      $allButton,
      $favoriteButton,
      restaurants: favoriteList,
      isFavorite: true,
    });
  });
}

function updateUI({
  $allButton,
  $favoriteButton,
  restaurants,
  isFavorite,
}: {
  $allButton: HTMLButtonElement;
  $favoriteButton: HTMLButtonElement;
  restaurants: Restaurant[];
  isFavorite: boolean;
}) {
  if (isFavorite) {
    $favoriteButton.classList.add("active");
    $allButton.classList.remove("active");
  } else {
    $allButton.classList.add("active");
    $favoriteButton.classList.remove("active");
  }

  const $restaurantFilterContainer = document.querySelector(
    ".restaurant-filter-container"
  ) as HTMLDivElement;
  if ($restaurantFilterContainer) {
    $restaurantFilterContainer.classList.toggle("active", isFavorite);
  }

  CreateRestaurantList(restaurants);
}
