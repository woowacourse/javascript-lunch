import {
  DESCRIPTION_MAX_LENGTH,
  NAME_MAX_LENGTH,
} from "../constants/constants.js";
import { ERROR_MESSAGE } from "../constants/errorMessage.js";

export function validateRequiredInput(input) {
  if (input.length === 0) {
    throw new Error(ERROR_MESSAGE.required);
  }
}

export function validateLength(input, maxLength) {
  if (input.length > maxLength) {
    throw new Error(ERROR_MESSAGE.length(maxLength));
  }
}

export function validateURL(input) {
  if (input.length === 0) {
    return;
  }
  try {
    const url = new URL(input);
  } catch (error) {
    throw new Error(ERROR_MESSAGE.url);
  }
}

//개별적인 함수
export function validateNameLength(value) {
  validateLength(value, NAME_MAX_LENGTH);
}

export function validateDescriptionLength(value) {
  validateLength(value, DESCRIPTION_MAX_LENGTH);
}
