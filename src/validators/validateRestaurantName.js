import toThrowNewError from "./toThrowNewError.js";
import { RESTAURANT_CONSTRAINTS } from "../constants/rules.js";

const validateRestaurantName = (name, restaurants) => {
  toThrowNewError({
    condition:
      name.trim().length < RESTAURANT_CONSTRAINTS.MIN_RESTAURANT_NAME ||
      name.trim().length > RESTAURANT_CONSTRAINTS.MAX_RESTAURANT_NAME,
    message: `음식점 이름을 최소 ${RESTAURANT_CONSTRAINTS.MIN_RESTAURANT_NAME}글자 ~ 최대 ${RESTAURANT_CONSTRAINTS.MAX_RESTAURANT_NAME}글자 입력해주세요.`,
  });
};

export default validateRestaurantName;
