import { ERROR_MESSAGE } from "./constants/constants.js";

const validateRestaurant = (newRestaurant, restaurantNames) => {
  if (newRestaurant.name.length > 20) {
    return ERROR_MESSAGE.restaurantNameMaxLength;
  }
  if (restaurantNames.includes(newRestaurant.name)) {
    return ERROR_MESSAGE.duplicateRestaurantName;
  }
  if (newRestaurant.description.length > 500) {
    return ERROR_MESSAGE.descriptionMaxLength;
  }
  return null;
};

export default validateRestaurant;
