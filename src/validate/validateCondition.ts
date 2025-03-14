import { ERROR_MESSAGE } from "../constants/errorMessage.js";

export function validateRequiredInput(input: string) {
  if (input.length === 0) {
    throw new Error(ERROR_MESSAGE.required);
  }
}

export function validateLength(input: string, maxLength: number) {
  if (input.length > maxLength) {
    throw new Error(ERROR_MESSAGE.length(maxLength));
  }
}

export function validateURL(input: string) {
  if (input.length === 0) {
    return;
  }
  try {
    new URL(input);
  } catch (error) {
    throw new Error(ERROR_MESSAGE.url);
  }
}
