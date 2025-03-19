import SIZE from '../constant/size.js';
import { RestaurantProps } from '../domain/Restaurant';
import { ERROR_MESSAGES } from './errorMessages';
import { isInvalidLength } from './validations';

export function validateDescription(description: RestaurantProps['description']) {
  if (description && isInvalidLength(description, SIZE.MAX_LENGTH_OF_DESCRIPTION)) {
    throw new Error(ERROR_MESSAGES.INVALID_DESCRIPTION_LENGTH);
  }
}
