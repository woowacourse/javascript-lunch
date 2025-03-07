import toThrowNewError from "./toThrowNewError.js";

const MAX_RESTAURANT_NAME = 15;
const MIN_RESTAURANT_NAME = 1;

const validateRestaurantName = (name) => {
  toThrowNewError({
    condition:
      name.trim().length < MIN_RESTAURANT_NAME ||
      name.trim().length > MAX_RESTAURANT_NAME,
    message: `레스토랑 이름을 최소 ${MIN_RESTAURANT_NAME}글자 ~ 최대 ${MAX_RESTAURANT_NAME}글자 입력해주세요.`,
  });
};

export default validateRestaurantName;
