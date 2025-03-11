import { ERROR_MESSAGES } from './errorMessages.js';
import { isBlank } from './validations.js';

export const validateDropDown = (title, input) => {
  if (isBlank(input)) {
    throw new Error(ERROR_MESSAGES.NOT_SELECTED(title));
  }
};
