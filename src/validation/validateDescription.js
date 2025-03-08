import { ERROR_MESSAGES } from './errorMessages.js';
import { isInvalidLength } from './validations.js';

export const validateDescription = (description) => {
  if (isInvalidLength(description, 200)) {
    throw new Error(ERROR_MESSAGES.INVALID_DESCRIPTION_LENGTH);
  }
};
