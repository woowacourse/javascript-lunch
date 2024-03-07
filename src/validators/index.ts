import ValidateConditions from './ValidateConditions';

export function RestaurantsValidator(restaurantNames: string[], name: string) {
  if (ValidateConditions.isIncluded(restaurantNames, name))
    throw new Error('중복된 가게 이름입니다!');
}
