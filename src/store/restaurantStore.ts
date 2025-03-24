import { RESTAURANTS } from '../data/restaurantData';
import { State } from './stateStore';

export const restaurantStore: State[] = initRestaurantStore();

export function addRestaurant(newRestaurant: State) {
  restaurantStore.push(newRestaurant);
  localStorage.setItem('restaurantStore', JSON.stringify(restaurantStore));
}

export function getNextRestaurantId() {
  return restaurantStore.length > 0 ? Math.max(...restaurantStore.map((item) => item.id)) + 1 : 1;
}

export function loadRestaurants(): State[] {
  const data = localStorage.getItem('restaurantStore');
  if (data) {
    return JSON.parse(data);
  }
  return [];
}

export function initRestaurantStore(): State[] {
  const stored = loadRestaurants();
  if (stored.length > 0) {
    return stored;
  }
  localStorage.setItem('restaurantStore', JSON.stringify([...RESTAURANTS]));
  return [...RESTAURANTS];
}

export function deleteRestaurant(restaurantId: number): void {
  const updatedStore = restaurantStore.filter((restaurant) => restaurant.id !== restaurantId);
  restaurantStore.length = 0;
  restaurantStore.push(...updatedStore);
  localStorage.setItem('restaurantStore', JSON.stringify(restaurantStore));
}
