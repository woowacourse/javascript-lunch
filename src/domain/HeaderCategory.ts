import { CreateRestaurantList } from "../components/CreateRestaurantList";
import { GetAllRestaurants } from "./RestaurantStorage";
import FilterByValue from "./FilterByValue";
import OrderByValue from "./OrderByValue";
import { Restaurant } from "../shared/types";

interface ButtonProps {
  $allButton: HTMLButtonElement;
  $favoriteButton: HTMLButtonElement;
  restaurants?: Restaurant[];
  favoriteList?: Restaurant[];
}

export default function HeaderCategory() {
  const $allButton = document.getElementById("all-button") as HTMLButtonElement;
  const $favoriteButton = document.getElementById(
    "favorite-button"
  ) as HTMLButtonElement;

  FilterByValue();
  OrderByValue();

  const restaurants: Restaurant[] = GetAllRestaurants();
  const favoriteList = restaurants.filter(
    (restaurant) => restaurant.favorite === true
  );

  $allButton.addEventListener("click", () =>
    AllButtonEvent({ $allButton, $favoriteButton, restaurants })
  );

  $favoriteButton.addEventListener("click", () =>
    FavoriteButtonEvent({
      $allButton,
      $favoriteButton,
      favoriteList,
    })
  );
}

function AllButtonEvent({
  $allButton,
  $favoriteButton,
  restaurants,
}: ButtonProps) {
  $allButton.classList.add("active");
  $favoriteButton.classList.remove("active");

  CreateRestaurantList(restaurants);
  location.reload();
}

function FavoriteButtonEvent({
  $allButton,
  $favoriteButton,
  favoriteList,
}: ButtonProps) {
  $favoriteButton.classList.add("active");
  $allButton.classList.remove("active");

  const $restaurantFilterContainer = document.querySelector(
    ".restaurant-filter-container"
  ) as HTMLDivElement;
  $restaurantFilterContainer.classList.add("active");

  CreateRestaurantList(favoriteList);
}
