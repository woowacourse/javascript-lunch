import {
  checkRestaurantName,
  checkInputLength,
  checkDuplicate,
} from "./errorThrower";

export const validateName = (restaurantName: string) => {
  checkDuplicate(restaurantName);
  checkInputLength(restaurantName);
  checkRestaurantName(restaurantName);
};
