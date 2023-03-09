import { ERROR_MESSAGE, RESTAURANT_NAME_LENGTH } from '../utils/constants';

const Validation = {
  validateRestaurantNameLength: (restaurantName: string) => {
    if (
      restaurantName.length < RESTAURANT_NAME_LENGTH.min ||
      restaurantName.length > RESTAURANT_NAME_LENGTH.max
    )
      throw new Error(ERROR_MESSAGE.restaurantNameLength);
  },

  validateRestaurantNameDuplication: (restaurantName: string, existRestaurantsName?: string[]) => {
    if (!existRestaurantsName) return;

    const isExist = existRestaurantsName.includes(restaurantName);

    if (isExist) throw new Error(ERROR_MESSAGE.restaurantNameDuplication);
  },

  validateRestaurantCategory: (category: string) => {
    if (category === '') throw new Error(ERROR_MESSAGE.restaurantCategory);
  },

  validateRestaurantDistanceByMinutes: (distanceByMinutes: number) => {
    if (distanceByMinutes === 0) throw new Error(ERROR_MESSAGE.restaurantDistanceByMinutes);
  },
};

export default Validation;
