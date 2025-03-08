import { ERROR_MESSAGES } from './errorMessages.js';
import { isBlank } from './validations.js';

const hasNotPrefixProtocol = (input) => {
  if (!input.match(/https?:\/\/[\w\-\.]+/g)) return true;
};

export const validateLink = (input) => {
  if (!isBlank(input) && hasNotPrefixProtocol(input)) {
    throw new Error(ERROR_MESSAGES.INVALID_LINK_FORMAT);
  }
};
