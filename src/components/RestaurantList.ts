import { $ } from '../utils/domSelectors';
import { Restaurant } from '../types/types';
import { RESTAURANT_IMAGE } from '../constants/images';
import { createRestaurantItem } from './RestaurantItem';

export const renderList = (sortedRestaurants: Restaurant[]) => {
  const restaurantList = $<HTMLUListElement>('.restaurant-list');

  restaurantList.innerHTML = '';
  const restaurantItems = sortedRestaurants.map(restaurant => {
    const categoryImageUrl = RESTAURANT_IMAGE[restaurant.category];

    return createRestaurantItem(restaurant, categoryImageUrl);
  });

  restaurantList.insertAdjacentHTML('beforeend', restaurantItems.join(''));
};
