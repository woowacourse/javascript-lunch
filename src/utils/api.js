import { REQUEST_RASTAURANT_KEY, REQUEST_RESTAURANT_ID_KEY } from './constants';

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

export const getNewId = () => {
  if (!localStorage.getItem(REQUEST_RESTAURANT_ID_KEY)) {
    localStorage.setItem(REQUEST_RESTAURANT_ID_KEY, '0');
  }

  const currentId = Number(localStorage.getItem(REQUEST_RESTAURANT_ID_KEY));
  localStorage.setItem(REQUEST_RESTAURANT_ID_KEY, `${currentId + 1}`);

  return currentId + 1;
};

export const postRestaurant = (restaurant) => {
  const restaurants = JSON.parse(localStorage.getItem(REQUEST_RASTAURANT_KEY) ?? '[]');
  restaurants.push(restaurant);
  localStorage.setItem(REQUEST_RASTAURANT_KEY, JSON.stringify(restaurants));
};
