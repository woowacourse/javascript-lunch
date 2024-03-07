import ValidationError from '../utils/ValidationError';
import ValidateConditions from './ValidateConditions';

interface ValidationInput {
  restaurantNames: string[];
  name: string;
}

export function validateRestaurantsName(value: ValidationInput) {
  const { restaurantNames, name } = value;
  if (ValidateConditions.isIncluded(restaurantNames, name))
    throw new Error('중복된 가게 이름입니다!');
}

export function validateRequiredValue(id: string, value: string) {
  if (ValidateConditions.isBlank(value))
    throw new ValidationError(`${id}는 필수 입력 값입니다.`, id);
}
