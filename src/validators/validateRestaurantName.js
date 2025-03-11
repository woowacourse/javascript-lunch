import toThrowNewError from "./toThrowNewError.js";
import RESTAURANT_RULES from "../constants/rules.js";

const validateRestaurantName = (name) => {
  toThrowNewError({
    condition:
      name.trim().length < RESTAURANT_RULES.MIN_RESTAURANT_NAME ||
      name.trim().length > RESTAURANT_RULES.MAX_RESTAURANT_NAME,
    message: `레스토랑 이름을 최소 ${RESTAURANT_RULES.MIN_RESTAURANT_NAME}글자 ~ 최대 ${RESTAURANT_RULES.MAX_RESTAURANT_NAME}글자 입력해주세요.`,
  });
};

export default validateRestaurantName;
