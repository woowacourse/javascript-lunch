import { currentRestaurantData, saveRestaurantsToLocalStorage } from "../data/storage/restaurantStorage.ts";
import { updateList } from "../main.ts";
import { FavoriteImageElement } from "../components/common/favorite-button.ts";
import { Restaurant } from "../data/models/restaurant.ts";

export const bindFavoriteButtonEvents = (favButton: FavoriteImageElement, restaurant: Restaurant): void => {
  favButton.addEventListener("mouseover", () => {
    if (!restaurant.isFavorite) favButton.src = "images/star-filled.png";
  });
  favButton.addEventListener("mouseout", () => {
    if (!restaurant.isFavorite) favButton.src = "images/star-outline.png";
  });
  favButton.addEventListener("click", (e) => {
    e.stopPropagation();
    restaurant.isFavorite = !restaurant.isFavorite;
    favButton.src = restaurant.isFavorite ? "images/star-filled.png" : "images/star-outline.png";
    updateList();
    saveRestaurantsToLocalStorage(currentRestaurantData);
  });
};
