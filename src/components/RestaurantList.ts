import { Restaurant } from '../types/types';
import createRestaurantItem from './RestaurantItem';

function createRestaurantList(sortedRestaurants: Restaurant[]) {
  return sortedRestaurants.map((restaurant) => createRestaurantItem(restaurant)).join('');
}

export default createRestaurantList;
