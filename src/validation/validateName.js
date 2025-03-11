import SIZE from '../constant/size.js';
import { ERROR_MESSAGES } from './errorMessages.js';
import { isBlank, isInvalidLength } from './validations.js';

export const validateName = (name) => {
  if (isBlank(name)) {
    throw new Error(ERROR_MESSAGES.IS_BLANK);
  }

  if (isInvalidLength(name, SIZE.MAX_LENGTH_OF_NAME)) {
    throw new Error(ERROR_MESSAGES.INVALID_NAME_LENGTH);
  }
};
