import {
  DeleteFavoriteRestaurantInStorage,
  GetAllRestaurants,
  SaveFavoriteRestaurantInStorage,
} from "./RestaurantStorage";

export function SaveFavoriteRestaurant() {
  const $favoriteButtons = document.querySelectorAll(
    ".restaurant-favorite-star-button"
  );

  $favoriteButtons.forEach((favoriteButton) => {
    favoriteButton.addEventListener("click", (e) => {
      const $restaurantItem = e.target.closest(".restaurant");

      const restaurants = GetAllRestaurants();

      const restaurantName =
        $restaurantItem.querySelector(".restaurant__name").textContent;

      const restaurant = restaurants.find(
        (restaurant) => restaurant.nameValue === restaurantName
      );

      SaveFavoriteRestaurantInStorage({
        ...restaurant,
        favorite: !restaurant.favorite,
      });
      location.reload();
    });
  });
}

export function SaveFavoriteRestaurantInModal() {
  const $favoriteButtons = document.querySelector(".restaurant-detail-modal");

  const $favoriteButton = $favoriteButtons.querySelector(
    ".restaurant-favorite-star-button"
  );

  const $restaurantName =
    $favoriteButtons.querySelector(".restaurant__name").textContent;

  $favoriteButton.addEventListener("click", (e) => {
    const restaurants = GetAllRestaurants();
    const filteredRestaurant = restaurants.find(
      (restaurant) => restaurant.nameValue === $restaurantName
    );

    SaveFavoriteRestaurantInStorage({
      ...filteredRestaurant,
      favorite: !filteredRestaurant.favorite,
    });
    location.reload();
  });
}
