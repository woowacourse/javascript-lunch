import Persistence from "../domain/persistence/Persistence";
import Restaurant from "../domain/Restaurant";
import { ERROR_MESSAGE } from "../constants/error";
import { clearError } from "../utils/clearError";
import { isEmpty } from "../validate/isEmpty";
import { isValidStringLength } from "../validate/isValidStringLength";
import { $ } from "../utils/dom";

const registerRestaurant = (restaurantList) => {
  const info = getInfo();
  const restaurant = new Restaurant(info);

  restaurantList.add(restaurant);
  Persistence.saveRestaurantList(restaurantList.value);
};

export default registerRestaurant;

const getInfo = () => {
  const form = $("#register-form");
  const formData = new FormData(form);
  const info = Object.fromEntries(formData.entries());

  clearError();
  return validateInfo(info);
};

const validateInfo = (info) => {
  if (isEmpty(info.category)) {
    throw new Error(ERROR_MESSAGE.CATEGORY_FIELD_REQUIRED, {
      cause: "category",
    });
  }
  if (isEmpty(info.name)) {
    throw new Error(ERROR_MESSAGE.NAME_FIELD_REQUIRED, { cause: "name" });
  }
  if (!isValidStringLength(info.name, { min: 1, max: 20 })) {
    throw new Error(ERROR_MESSAGE.NAME_LENGTH, { cause: "name" });
  }

  if (isEmpty(info.distance)) {
    throw new Error(ERROR_MESSAGE.DISTANCE_FIELD_REQUIRED, {
      cause: "distance",
    });
  }

  if (!isValidStringLength(info.description, { min: 0, max: 500 })) {
    throw new Error(ERROR_MESSAGE.DESCRIPTION_LENGTH, { cause: "description" });
  }

  return info;
};
