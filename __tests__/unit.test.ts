import Validator from '../src/Validator';

describe('Validator.isValidCategory', () => {
  test('정해진 카테고리 외의 값을 선택한 경우, false를 반환한다.', () => {
    const selectedCategory = '인도식';

    const expected = Validator.isValidCategory(selectedCategory);

    expect(expected).toBe(false);
  });

  test('정해진 카테고리 내의 값을 선택한 경우, true를 반환한다.', () => {
    const selectedCategory = '한식';

    const expected = Validator.isValidCategory(selectedCategory);

    expect(expected).toBe(true);
  });
});

test('정해진 카테고리 외의 카테고리 값인 경우, 에러가 발생한다.', () => {
  const selectedCategory = '인도식';

  expect(() => Validator.validateCategory(selectedCategory)).toThrow();
});

describe('Validator.isEmptyFormValue', () => {
  test('form value가 빈 문자열이면, true를 반환한다.', () => {
    const formValue = '';

    const expected = Validator.isEmptyFormValue(formValue);

    expect(expected).toBe(true);
  });

  test.each(['일식', '돈카라', '5'])('form value가 존재하면, false를 반환한다.', (formValue) => {
    const expected = Validator.isEmptyFormValue(formValue);

    expect(expected).toBe(false);
  });
});
