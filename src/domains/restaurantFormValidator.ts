import { REGEX, ERROR_MESSAGE } from "../constants/constants";

export const restaurantFormValidator = {
  throwErrorIfEmptySelectValue(input: string, type: string) {
    if (!input) throw new Error(ERROR_MESSAGE.EMPTY_SELECT_VALUE(type));
  },

  verifyNameInput(input: string) {
    this.throwErrorIfEmptyName(input);
    this.throwErrorIfInvalidName(input);
  },

  throwErrorIfEmptyName(input: string) {
    if (!input) throw new Error(ERROR_MESSAGE.EMPTY_NAME);
  },

  throwErrorIfInvalidName(input: string) {
    if (!REGEX.VALID_NAME.test(input)) {
      throw new Error(ERROR_MESSAGE.INVALID_NAME);
    }
  },

  throwErrorIfInvalidLink(input: string) {
    if (!REGEX.VALID_URL.test(input)) {
      throw new Error(ERROR_MESSAGE.INVALID_LINK);
    }
  },
};
