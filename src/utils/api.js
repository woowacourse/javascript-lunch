import { REQUEST_RASTAURANT_KEY } from './constants';

export const fetchFavoriteId = (id) => {
  const restaurants = JSON.parse(localStorage.getItem(REQUEST_RASTAURANT_KEY) ?? '[]');

  const newRestaurants = restaurants.map((restaurant) => {
    if (restaurant.id === id) {
      restaurant.isFavorite = !restaurant.isFavorite;
    }
    return restaurant;
  });

  localStorage.setItem(REQUEST_RASTAURANT_KEY, JSON.stringify(newRestaurants));
};

export const deleteById = (id) => {
  const restaurants = JSON.parse(localStorage.getItem(REQUEST_RASTAURANT_KEY) ?? '[]');

  const newRestaurants = restaurants.filter((restaurant) => restaurant.id !== id);

  localStorage.setItem(REQUEST_RASTAURANT_KEY, JSON.stringify(newRestaurants));
};

export const getRestaurantById = (id) => {
  const restaurants = JSON.parse(localStorage.getItem(REQUEST_RASTAURANT_KEY) ?? '[]');

  return restaurants.filter((restaurant) => restaurant.id === id)[0];
};

export const getRestaurants = () => {
  return JSON.parse(localStorage.getItem(REQUEST_RASTAURANT_KEY) ?? '[]');
};
