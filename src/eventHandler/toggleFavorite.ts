import { Restaurant } from "../types/type.ts";
import { StorageController } from "../utils/storage.ts";

const restaurantStorage = new StorageController<Restaurant[]>("restaurants");

const toggleFavorite = (event: MouseEvent) => {
  event.stopPropagation();

  const $icon = event.target as HTMLImageElement;
  const restaurantId = $icon.dataset.id;

  let restaurants: Restaurant[] = restaurantStorage.getStorage() ?? [];

  restaurants = restaurants.map((restaurant) => {
    if (restaurant.id === restaurantId) {
      return { ...restaurant, isFavorite: !restaurant.isFavorite };
    }
    return restaurant;
  });

  restaurantStorage.setStorage(restaurants);

  if ($icon.classList.contains("favorite-icon")) {
    if ($icon.src.includes("/favorite-icon-filled.png")) {
      $icon.src = "/favorite-icon-lined.png";
    } else {
      $icon.src = "/favorite-icon-filled.png";
    }
  }
};

export default toggleFavorite;
