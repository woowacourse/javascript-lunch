import { RestaurantProps } from '../domain/Restaurant';
import { ERROR_MESSAGES } from './errorMessages.js';
import { isBlank } from './validations';

function hasNotPrefixProtocol(input: string) {
  return !input.match(/https?:\/\/[\w\-\.]+/g) ? true : false;
}

export function validateLink(input: RestaurantProps['link']) {
  if (!isBlank(input) && hasNotPrefixProtocol(input)) {
    throw new Error(ERROR_MESSAGES.INVALID_LINK_FORMAT);
  }
}
