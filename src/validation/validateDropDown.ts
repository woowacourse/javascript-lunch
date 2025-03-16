import { ERROR_MESSAGES } from './errorMessages.js';
import { isBlank } from './validations.ts';

export function validateDropDown(title: string, input: string) {
  if (isBlank(input)) {
    throw new Error(ERROR_MESSAGES.NOT_SELECTED(title));
  }
}
