import { REQUEST_RASTAURANT_KEY } from './constants';

export const fetchFavoriteId = (id) => {
  const restaurants = JSON.parse(localStorage.getItem(REQUEST_RASTAURANT_KEY) ?? '[]');

  const newRestaurants = restaurants.map((restaurant) => {
    if (restaurant.id === id) {
      restaurant.isFavorite = !restaurant.isFavorite;
    }
    return restaurant;
  });
  localStorage.setItem(REQUEST_RASTAURANT_KEY, JSON.stringify(restaurants));
};
