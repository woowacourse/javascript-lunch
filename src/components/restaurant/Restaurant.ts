import { RestaurantState } from '../../types';

import { getMatchedCategoryInfo } from './renderHandlers';
import { baseTemplate, categoryTemplate, template } from './restaurantTemplate';

function Restaurant(restaurant: RestaurantState) {
  const categoryInfo = getMatchedCategoryInfo(restaurant);
  const restaurantContainer = baseTemplate(categoryTemplate(categoryInfo), template(restaurant));

  return restaurantContainer;
}

export default Restaurant;
