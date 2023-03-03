import {
  checkRestaurantName,
  checkInputLength,
  checkDuplicate,
} from "./errorThrower";

export const validateName = (restaurantInfo: string) => {
    checkRestaurantName(restaurantInfo);
    checkInputLength(restaurantInfo);
    checkDuplicate(restaurantInfo);
};
