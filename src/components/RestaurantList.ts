import { Restaurant } from '../types/types';
import createRestaurantItem from './RestaurantItem';

function createRestaurantList(sortedRestaurants: Restaurant[]) {
  return sortedRestaurants.map((restaurant) => createRestaurantItem(restaurant));
}

export default createRestaurantList;
