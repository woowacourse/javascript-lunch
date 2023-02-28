import Validator from '../src/Validator';

test('정해진 카테고리 외의 카테고리 값인 경우, 에러가 발생한다.', () => {
  const selectedCategory = '인도식';

  expect(() => Validator.validateCategory(selectedCategory)).toThrow();
});
