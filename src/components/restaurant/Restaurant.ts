import { Irestaurant } from "../../types/restaurant";

import categoryMatchedImageData from "./categoryMatchedImageData";
import { categoryTemplate } from "./restaurantInfoTemplate";
import { restaurantTemplate } from "./restaurantTemplate";

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

const render = (restaurant: Irestaurant) => {
  const categoryInfo = getMatchedCategoryInfo(restaurant);
  const restaurantContainer = restaurantTemplate(
    restaurant.id,
    categoryTemplate(categoryInfo),
    restaurant,
  );

  return restaurantContainer;
};

function Restaurant(restaurant: Irestaurant) {
  return render(restaurant);
}

export default Restaurant;
