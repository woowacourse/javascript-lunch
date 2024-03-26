import createRestaurantList from '../component/restaurantList.js';
import { removeChildElement } from '../utils/removeChildElement.js';

function createFavoriteRestaurantList({
  getFavoriteRestaurantList,
  favoriteRestaurantList,
}) {
  removeChildElement('.restaurant-filter-container');
  createRestaurantList({
    restaurantList: getFavoriteRestaurantList(),
    toggleFavorite: favoriteRestaurantList.toggleRestaurant,
    hasFavorite: favoriteRestaurantList.hasRestaurant,
  });
}

export { createFavoriteRestaurantList };
