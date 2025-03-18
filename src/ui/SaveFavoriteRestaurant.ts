import {
  GetAllRestaurants,
  SaveFavoriteRestaurantInStorage,
} from "../domain/RestaurantService";

export function SaveFavoriteRestaurant() {
  const $favoriteButtons: NodeListOf<Element> = document.querySelectorAll(
    ".restaurant-favorite-star-button"
  );

  $favoriteButtons.forEach((favoriteButton) => {
    favoriteButton.addEventListener("click", (e: Event) => {
      const $restaurantItem = (e.target as HTMLElement).closest(
        ".restaurant"
      ) as HTMLElement;

      const restaurants = GetAllRestaurants();

      const restaurantName =
        $restaurantItem?.querySelector(".restaurant__name")?.textContent;

      const restaurant = restaurants.find(
        (restaurant) => restaurant.nameValue === restaurantName
      );

      if (!restaurant) return;
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

  const $favoriteButton = $favoriteButtons?.querySelector(
    ".restaurant-favorite-star-button"
  );

  const $restaurantName =
    $favoriteButtons?.querySelector(".restaurant__name")?.textContent;

  $favoriteButton?.addEventListener("click", () => {
    const restaurants = GetAllRestaurants();
    const filteredRestaurant = restaurants.find(
      (restaurant) => restaurant.nameValue === $restaurantName
    );

    if (!filteredRestaurant) return;
    SaveFavoriteRestaurantInStorage({
      ...filteredRestaurant,
      favorite: !filteredRestaurant.favorite,
    });
    location.reload();
  });
}
