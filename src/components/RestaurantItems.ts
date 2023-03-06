import { Restaurant } from '../types/types';
import { RESTAURANT_IMAGE } from '../constants/images';
import { RestaurantItem } from './RestaurantItem';

export const RestaurantItems = (sortedRestaurants: Restaurant[]) => {
  const restaurantItems = sortedRestaurants.map((restaurant) => {
    const categoryImageUrl = RESTAURANT_IMAGE[restaurant.category];

    return RestaurantItem(restaurant, categoryImageUrl);
  });

  return restaurantItems.join('');
};
