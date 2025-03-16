import SIZE from '../constant/size.js';
import { RestaurantProps } from '../domain/Restaurant.ts';
import { ERROR_MESSAGES } from './errorMessages.js';
import { isInvalidLength } from './validations.ts';

export function validateDescription(description: RestaurantProps['description']) {
  if (isInvalidLength(description, SIZE.MAX_LENGTH_OF_DESCRIPTION)) {
    throw new Error(ERROR_MESSAGES.INVALID_DESCRIPTION_LENGTH);
  }
}
