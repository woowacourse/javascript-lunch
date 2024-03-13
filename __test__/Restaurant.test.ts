import { ERROR_PREFIX } from '../src/constants/errorMessage.js';
import Restaurant from '../src/domain/Restaurant.ts';

describe('Restaurant 테스트', () => {
  const invalidRestaurantCase: any[] = [
    {
      category: '간편식',
      name: '반포식스',
      distanceFromCampus: 5,
    },
    {
      category: '한식',
      name: 1,
      distanceFromCampus: 5,
    },
    {
      category: '한식',
      name: '반포식스',
      distanceFromCampus: 100,
    },
  ];
  test.each(invalidRestaurantCase)('$category, $name, $distanceFromCampus 를 입력시 에러가 발생한다.', (input) => {
    expect(() => new Restaurant(input)).toThrow(`${ERROR_PREFIX}`);
  });
});
