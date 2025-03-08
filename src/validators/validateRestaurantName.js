import { RESTAURANT_RULES } from "../constants/rules.js";
import throwError from "./throwError.js";

const validateRestaurantName = (name) => {
  const { MIN_RESTAURANT_NAME, MAX_RESTAURANT_NAME } = RESTAURANT_RULES;
  throwError({
    condition:
      name.trim().length < MIN_RESTAURANT_NAME ||
      name.trim().length > MAX_RESTAURANT_NAME,
    message: `레스토랑 이름을 최소 ${MIN_RESTAURANT_NAME}글자 ~ 최대 ${MAX_RESTAURANT_NAME}글자 입력해주세요.`,
  });
};

export default validateRestaurantName;
