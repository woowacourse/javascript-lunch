import { NAME_MAX_LENGTH } from "../constants/constants.js";
import { ERROR_MESSAGE } from "../constants/errorMessage.js";

export function validateRequiredInput(input) {
  if (input.length === 0) {
    throw new Error(ERROR_MESSAGE.requird);
  }
}

export function validateLength(input, maxLength) {
  if (input.length > maxLength) {
    throw new Error(ERROR_MESSAGE.length(maxLength));
  }
}
