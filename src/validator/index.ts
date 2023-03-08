import {
  checkRestaurantName,
  checkInputLength,
  checkDuplicate,
} from "./errorThrower";

export const validateName = (restaurantInfo: string) => {
  checkDuplicate(restaurantInfo);
  checkInputLength(restaurantInfo);
  checkRestaurantName(restaurantInfo);
};
