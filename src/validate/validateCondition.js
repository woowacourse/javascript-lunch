import { NAME_MAX_LENGTH } from "../constants/constants.js";
import { ERROR_MESSAGE } from "../constants/errorMessage.js";

export function validateRequiredInput(input) {
  if (input.length === 0) {
    throw new Error(ERROR_MESSAGE.requird);
  }
}

export function validateNameLength(input) {
  if (input.length > NAME_MAX_LENGTH) {
    throw new Error(ERROR_MESSAGE.length(NAME_MAX_LENGTH));
  }
}
