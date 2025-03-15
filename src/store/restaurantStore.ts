import { RESTAURANTS } from '../data/restaurantData';
import { State } from './stateStore';

export let restaurantStore: State[] = [...RESTAURANTS];

export function addRestaurant(newRestaurant: State) {
  restaurantStore.push(newRestaurant);
  console.log(restaurantStore);
}

export function getNextRestaurantId() {
  return restaurantStore.length > 0 ? Math.max(...restaurantStore.map((item) => item.id)) + 1 : 1;
}
