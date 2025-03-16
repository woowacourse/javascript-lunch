import { ERROR_MESSAGE, VALIDATE_SETTINGS } from "./constants/constants.ts";

const validateRestaurant = (newRestaurant, restaurantNames) => {
  if (newRestaurant.name.length < VALIDATE_SETTINGS.nameMinLength) {
    return ERROR_MESSAGE.restaurantNameMinLength;
  }

  if (newRestaurant.name.length > VALIDATE_SETTINGS.nameMaxLength) {
    return ERROR_MESSAGE.restaurantNameMaxLength;
  }

  if (restaurantNames.includes(newRestaurant.name)) {
    return ERROR_MESSAGE.duplicateRestaurantName;
  }

  if (
    newRestaurant.description.length > VALIDATE_SETTINGS.descriptionMaxLength
  ) {
    return ERROR_MESSAGE.descriptionMaxLength;
  }

  return null;
};

export default validateRestaurant;
