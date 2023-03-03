import { checkRestaurantName, checkInputLength } from "./errorThrower";

export const validateName = (restaurantInfo: string) => {
  checkRestaurantName(restaurantInfo);
  checkInputLength(restaurantInfo);
};
