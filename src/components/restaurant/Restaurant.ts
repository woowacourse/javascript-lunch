import { Irestaurant } from "../../types/restaurant";

import { getMatchedCategoryInfo } from "./renderHandlers";
import { baseTemplate, categoryTemplate, template } from "./restaurantTemplate";

function Restaurant(restaurant: Irestaurant) {
  const categoryInfo = getMatchedCategoryInfo(restaurant);
  const restaurantContainer = baseTemplate(
    categoryTemplate(categoryInfo),
    template(restaurant),
  );

  return restaurantContainer;
}

export default Restaurant;
