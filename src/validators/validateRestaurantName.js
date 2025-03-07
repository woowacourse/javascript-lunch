import toThrowNewError from "./toThrowNewError.js";
import RULES from "../constants/rules.js";

const validateRestaurantName = (name) => {
  toThrowNewError({
    condition:
      name.trim().length < RULES.MIN_RESTAURANT_NAME ||
      name.trim().length > RULES.MAX_RESTAURANT_NAME,
    message: `레스토랑 이름을 최소 ${RULES.MIN_RESTAURANT_NAME}글자 ~ 최대 ${RULES.MAX_RESTAURANT_NAME}글자 입력해주세요.`,
  });
};

export default validateRestaurantName;
