import { ERROR_MESSAGES } from './errorMessages.js';
import { isBlank, isInvalidLength } from './validations.js';

export const validateName = (name) => {
  if (isBlank(name)) {
    throw new Error(ERROR_MESSAGES.IS_BLANK);
  }

  if (isInvalidLength(name, 20)) {
    throw new Error(ERROR_MESSAGES.INVALID_NAME_LENGTH);
  }
};
