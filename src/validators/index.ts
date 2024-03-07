import ValidationError from '../utils/ValidationError';
import ValidateConditions from './ValidateConditions';

interface ValidationInput {
  restaurantNames: string[];
  name: string;
}

// TODO: 함수명 동사 + 명사로 변경하기
export function RestaurantsValidator(inputElement: HTMLElement, value: ValidationInput) {
  const { restaurantNames, name } = value;
  if (ValidateConditions.isIncluded(restaurantNames, name))
    throw new ValidationError('중복된 가게 이름입니다!', inputElement);
}

export function validateRequiredValue(inputElement: HTMLElement, value: string) {
  if (ValidateConditions.isBlank(value))
    throw new ValidationError(`${inputElement.id}는 필수 입력 값입니다.`, inputElement);
}
