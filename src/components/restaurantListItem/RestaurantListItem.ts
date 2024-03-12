import { RestaurantState } from '../../types';

import { getMatchedCategoryInfo } from './matchCategoryImage';
import generateRestaurantListItemComponent from './renderHandlers';

function RestaurantListItem(restaurant: RestaurantState) {
  const categoryInfo = getMatchedCategoryInfo(restaurant);

  return generateRestaurantListItemComponent(restaurant, categoryInfo);
}

export default RestaurantListItem;
