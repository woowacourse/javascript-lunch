import { ERROR_PREFIX } from '../src/constants/errorMessage.js';
import Restaurant from '../src/domain/Restaurant.ts';

describe('Restaurant 생성 테스트', () => {
  test('정해진 카테고리가 아닌 "간편식"을 입력시, 에러가 발생한다.', () => {
    const invalidRestaurantCase: any = {
      category: '간편식',
      name: '반포식스',
      distanceFromCampus: 5,
    };
    expect(() => new Restaurant(invalidRestaurantCase)).toThrow(`${ERROR_PREFIX}`);
  });

  test('이름에 문자열이 아닌 숫자 1 입력시, 에러가 발생한다.', () => {
    const invalidRestaurantCase: any = {
      category: '한식',
      name: 1,
      distanceFromCampus: 5,
    };
    expect(() => new Restaurant(invalidRestaurantCase)).toThrow(`${ERROR_PREFIX}`);
  });

  test('정해진 거리가 아닌 100을 입력시 에러가 발생한다.', () => {
    const invalidRestaurantCase: any = {
      category: '한식',
      name: '반포식스',
      distanceFromCampus: 100,
    };
    expect(() => new Restaurant(invalidRestaurantCase)).toThrow(`${ERROR_PREFIX}`);
  });
});
