import { RestaurantState } from '../../types';

import generateRestaurantListItemComponent from './renderHandlers';
import changeFavoriteIconState from './favoriteStateChangeHandler';
import showRestaurantListItemDetail from './showRestaurantListItemDetail';

function RestaurantListItem(restaurant: RestaurantState) {
  const restaurantListItem = generateRestaurantListItemComponent(restaurant);

  changeFavoriteIconState();
  showRestaurantListItemDetail();

  return restaurantListItem;
}

export default RestaurantListItem;
