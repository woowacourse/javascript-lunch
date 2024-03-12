import {
  validateRestaurantsName,
  validateRequiredValue,
} from '../../src/validators/ValidateInput.ts';

describe('ValidateInput 유효성 검증 테스트', () => {
  it('주어진 식당 목록(["가게1", "가게2", "가게3"])에 이미 같은 이름의 식당("가게3")이 존재할 경우 에러를 반환한다.', () => {
    const input = {
      restaurantNames: ['가게1', '가게2', '가게3'],
      name: '가게3',
    };

    expect(() => validateRestaurantsName(input)).to.throw();
  });

  it('필수 값으로 빈 문자열이 전달될 경우 에러를 반환한다.', () => {
    const id = 'category';
    const value = '';

    expect(() => validateRequiredValue(id, value)).to.throw();
  });
});
