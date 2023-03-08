import { Restaurant } from '../types/types';
import { RestaurantItem } from './RestaurantItem';
import { RESTAURANT_IMAGE } from '../constants/images';
import './RestaurantList.css';

export const RestaurantList = (sortedRestaurants: Restaurant[]) => {
  const restaurantItems = sortedRestaurants.map((restaurant) => {
    const categoryImageUrl = RESTAURANT_IMAGE[restaurant.category];

    return RestaurantItem(restaurant, categoryImageUrl);
  });

  return `<ul class="restaurant-list">${restaurantItems.join('')}</ul>`;
};
