import SIZE from '../constant/size.js';
import { RestaurantProps } from '../domain/Restaurant';
import { ERROR_MESSAGES } from './errorMessages.js';
import { isBlank, isInvalidLength } from './validations';

export function validateName(name: RestaurantProps['name']) {
  if (isBlank(name)) {
    throw new Error(ERROR_MESSAGES.IS_BLANK);
  }

  if (isInvalidLength(name, SIZE.MAX_LENGTH_OF_NAME)) {
    throw new Error(ERROR_MESSAGES.INVALID_NAME_LENGTH);
  }
}
