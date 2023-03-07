import {
  checkRestaurantName,
  checkInputLength,
  checkDuplicate,
} from './errorChecker';

export const isValidName = (restaurantName: string) => {
  checkRestaurantName(restaurantName);
  checkInputLength(restaurantName);
  checkDuplicate(restaurantName);

  return true;
};
