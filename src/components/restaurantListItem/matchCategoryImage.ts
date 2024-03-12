import { RestaurantState } from '../../types';

import categoryMatchedImageData from './categoryMatchedImageData';

export const findCategory = (restaurant: RestaurantState) =>
  categoryMatchedImageData.find((item) => item.alt === restaurant.category);

export const getMatchedCategoryInfo = (restaurant: RestaurantState) => {
  const categoryInfo = findCategory(restaurant);
  if (categoryInfo) return categoryInfo;

  return {
    src: '',
    alt: '',
  };
};
