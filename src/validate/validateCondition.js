import { ERROR_MESSAGE } from "../constants/errorMessage.js";
import { getInput } from "../util/getInput.js";

export function validateRequiredInput(name) {
  if (getInput(name).length === 0) {
    throw new Error(ERROR_MESSAGE.required);
  }
}

export function validateLength(name, maxLength) {
  if (getInput(name).length > maxLength) {
    throw new Error(ERROR_MESSAGE.length(maxLength));
  }
}

export function validateURL(name) {
  if (getInput(name).length === 0) {
    return;
  }
  try {
    const url = new URL(getInput(name));
  } catch (error) {
    throw new Error(ERROR_MESSAGE.url);
  }
}
