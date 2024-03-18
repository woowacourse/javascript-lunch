import { RestaurantState } from '../../types';

import generateRestaurantListItemComponent from './renderHandlers';
import showRestaurantListItemDetail from './showRestaurantListItemDetail';

function RestaurantListItem(restaurant: RestaurantState) {
  const restaurantListItem = generateRestaurantListItemComponent(restaurant);

  showRestaurantListItemDetail();

  return restaurantListItem;
}

export default RestaurantListItem;
