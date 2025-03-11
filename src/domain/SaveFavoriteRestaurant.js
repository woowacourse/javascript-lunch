import {
  DeleteFavoriteRestaurantInStorage,
  GetAllRestaurants,
  SaveFavoriteRestaurantInStorage,
} from "./RestaurantStorage";

export default function SaveFavoriteRestaurant() {
  const $favoriteButton = document.querySelector(
    ".restaurant-favorite-star-button"
  );

  document
    .querySelector(".restaurant-list-container")
    .addEventListener("click", (e) => {
      const $restaurantItem = e.target.closest(".restaurant");

      const restaurants = GetAllRestaurants();

      const restaurantName =
        $restaurantItem.querySelector(".restaurant__name").textContent;

      if (DeleteFavoriteRestaurantInStorage(restaurantName)) {
        location.reload();
        return;
      }

      const restaurant = restaurants.find(
        (restaurant) => restaurant.nameValue === restaurantName
      );

      SaveFavoriteRestaurantInStorage({
        ...restaurant,
        favorite: !restaurant.favorite,
      });
      location.reload();
    });
}
