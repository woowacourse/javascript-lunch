import { ERROR_MESSAGES } from '../constants/messages';
import { CONVERT } from '../constants/rules';

interface ValidationInput {
  restaurantNames: string[];
  name: string;
}

export function validateRestaurantsName(value: ValidationInput) {
  const { restaurantNames, name } = value;
  if (restaurantNames.includes(name)) throw new Error(ERROR_MESSAGES.duplicateName);
}

export function validateRequiredValue(id: string, value: string) {
  if (value === '') {
    throw new Error(`${CONVERT[id]}: ${ERROR_MESSAGES.requireValue}`);
  }
}
