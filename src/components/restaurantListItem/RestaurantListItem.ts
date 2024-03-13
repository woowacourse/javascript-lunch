import { RestaurantState } from '../../types';

import generateRestaurantListItemComponent from './renderHandlers';
import changeFavoriteIconState from './eventHandlers';

function RestaurantListItem(restaurant: RestaurantState) {
  const restaurantListItem = generateRestaurantListItemComponent(restaurant);

  changeFavoriteIconState();

  return restaurantListItem;
}

export default RestaurantListItem;
