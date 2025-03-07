import { ERROR_MESSAGE } from "../constants/errorMessage.js";
import { removeError, setError } from "../util/errorHandler.js";
import { getInput } from "../util/getInput.js";

export function validateRequiredInput(name) {
  if (getInput(name).length === 0) {
    setError(name);
    throw new Error(ERROR_MESSAGE.required);
  }
  removeError(name);
}

export function validateLength(name, maxLength) {
  if (getInput(name).length > maxLength) {
    setError(name);
    throw new Error(ERROR_MESSAGE.length(maxLength));
  }
  removeError(name);
}

export function validateURL(name) {
  if (getInput(name).length === 0) {
    return;
  }
  try {
    const url = new URL(getInput(name));
  } catch (error) {
    setError(name);
    throw new Error(ERROR_MESSAGE.url);
  }
  removeError(name);
}
