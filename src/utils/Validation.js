import { getRestaurantListFromLocalstorage } from "./LocalStorage";
import { LOCALSTORAGE_KEY } from "./Constant";

const nameCountLimitValidation = (name) => {
  return name.length > 10;
};

const nameExistValidation = (name) => {
  return name.trim() === "";
};

const nameRepeatValidation = (name) => {
  const restaurants = getRestaurantListFromLocalstorage(LOCALSTORAGE_KEY.RESTAURANT);
  if (restaurants.length === 0) return false;
  return !restaurants.every((restaurant) => restaurant.name !== name);
};

export const nameValidation = (name) => {
  if (nameCountLimitValidation(name))
    throw new Error("[Error] 이름은 10자 이하만 입력 가능합니다.");

  if (nameExistValidation(name))
    throw new Error("[Error] 이름은 공백으로만 이루어질 수 없습니다.");

  if (nameRepeatValidation(name))
    throw new Error("[Error] 이름은 중복될 수 없습니다.");
};