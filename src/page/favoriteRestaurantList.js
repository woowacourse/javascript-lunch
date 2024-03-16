import createRestaurantList from '../component/restaurantList.js';
import { removeChildElement } from '../utils/removeChildElement.js';

function createFavoriteRestaurantList({
  getFavoriteRestaurantList,
  favoriteRestaurantList,
}) {
  // 불필요한 필터 제거
  removeChildElement('.restaurant-filter-container');
  createRestaurantList({
    restaurantList: getFavoriteRestaurantList(),
    toggleFavorite: favoriteRestaurantList.toggleRestaurant,
    hasFavorite: favoriteRestaurantList.hasRestaurant,
  });
}

export { createFavoriteRestaurantList };
