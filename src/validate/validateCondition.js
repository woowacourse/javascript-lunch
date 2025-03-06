import { ERROR_MESSAGE } from "../constants/errorMessage.js";

export function validateRequiredInput(input) {
  if (input.length === 0) {
    throw new Error(ERROR_MESSAGE.requird);
  }
}
