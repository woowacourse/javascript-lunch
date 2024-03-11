import { Irestaurant } from "../../types/restaurant";

import categoryMatchedImageData from "./categoryMatchedImageData";
import { baseTemplate, categoryTemplate, template } from "./restaurantTemplate";

export const findCategory = (restaurant: Irestaurant) =>
  categoryMatchedImageData.find(
    (item) => item.category === restaurant.category,
  );

export const getMatchedCategoryInfo = (restaurant: Irestaurant) => {
  const categoryInfo = findCategory(restaurant);
  if (categoryInfo) return categoryInfo;

  return {
    categoryImg: "",
    category: "",
  };
};

function Restaurant(restaurant: Irestaurant) {
  const categoryInfo = getMatchedCategoryInfo(restaurant);
  const restaurantContainer = baseTemplate(
    categoryTemplate(categoryInfo),
    template(restaurant),
  );

  return restaurantContainer;
}

export default Restaurant;
