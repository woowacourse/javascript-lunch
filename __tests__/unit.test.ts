import Validator from '../src/Validator';

test('정해진 카테고리 외의 카테고리 값인 경우, 에러가 발생한다.', () => {
  const selectedCategory = '인도식';

  expect(() => Validator.validateCategory(selectedCategory)).toThrow();
});

describe('이름 입력 유효성 검사', () => {
  test('입력값이 비어있으면, true를 반환한다.', () => {
    const rastaurantName = '';

    const expected = Validator.isEmpty(rastaurantName);

    expect(expected).toBe(true);
  });

  test('입력값이 존재하면, false를 반환한다.', () => {
    const rastaurantName = '돈카라';

    const expected = Validator.isEmpty(rastaurantName);

    expect(expected).toBe(false);
  });
});
