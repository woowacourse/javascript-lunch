import { RestaurantState } from '../../types';

import generateRestaurantListItemComponent from './renderHandlers';

function RestaurantListItem(restaurant: RestaurantState) {
  const restaurantListItem = generateRestaurantListItemComponent(restaurant);

  return restaurantListItem;
}

export default RestaurantListItem;
