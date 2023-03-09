import {
  checkRestaurantName,
  checkInputLength,
  checkDuplicateNameInRestaurantList,
} from './errorChecker';

export const isValidName = (restaurantName: string) => {
  checkRestaurantName(restaurantName);
  checkInputLength(restaurantName);
  checkDuplicateNameInRestaurantList(restaurantName);

  return true;
};
