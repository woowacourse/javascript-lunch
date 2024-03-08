import { Irestaurant } from "../../types";

import categoryMatchedImageData from "./categoryMatchedImageData";

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
