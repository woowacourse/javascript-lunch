import SIZE from '../constant/size.js';
import { ERROR_MESSAGES } from './errorMessages.js';
import { isInvalidLength } from './validations.js';

export const validateDescription = (description) => {
  if (isInvalidLength(description, SIZE.MAX_LENGTH_OF_DESCRIPTION)) {
    throw new Error(ERROR_MESSAGES.INVALID_DESCRIPTION_LENGTH);
  }
};
