import { checkRestaurantName, checkInputLength } from "./errorThrower";

export const validateName = (restaurantInfo: string[]) => {
  checkRestaurantName(restaurantInfo[1]);
  checkInputLength(restaurantInfo[1]);
};
