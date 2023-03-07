import {
  checkRestaurantName,
  checkInputLength,
  checkDuplicate,
} from './errorChecker';

export const validateName = (restaurantInfo: string) => {
  checkRestaurantName(restaurantInfo);
  checkInputLength(restaurantInfo);
  checkDuplicate(restaurantInfo);

  return true;
};
