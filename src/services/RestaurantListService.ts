import { RESTAURANT_ITEMS, RestaurantItem } from '../../public/restaurantData.ts';

const STORAGE_KEY = 'addedRestaurants';

function getStoredRestaurants(): RestaurantItem[] {
  const storedData = localStorage.getItem(STORAGE_KEY);
  return storedData ? JSON.parse(storedData) : [];
}

function saveRestaurants(restaurants: RestaurantItem[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(restaurants));
}

function deleteRestaurantById(id: string): void {
  const storedData = getStoredRestaurants().filter((item) => item.id !== id);
  saveRestaurants(storedData);
}

function getAllRestaurants(): RestaurantItem[] {
  return [...RESTAURANT_ITEMS, ...getStoredRestaurants()];
}

export { getStoredRestaurants, saveRestaurants, deleteRestaurantById, getAllRestaurants };
