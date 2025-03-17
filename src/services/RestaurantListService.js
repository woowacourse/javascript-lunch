import { RESTAURANT_ITEMS } from '../../public/restaurantData.js';

const STORAGE_KEY = 'addedRestaurants';

function getStoredRestaurants() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

function saveRestaurants(restaurants) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(restaurants));
}

function deleteRestaurantById(id) {
  const storedData = getStoredRestaurants().filter((item) => item.id !== id);
  saveRestaurants(storedData);
}

function getAllRestaurants() {
  return [...RESTAURANT_ITEMS, ...getStoredRestaurants()];
}

export { getStoredRestaurants, saveRestaurants, deleteRestaurantById, getAllRestaurants };
