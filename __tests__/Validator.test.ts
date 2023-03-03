import Validator from '../src/domain/Validator';
import { ERROR_MESSAGE } from '../src/constants/message';

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

describe('Validator.validateCategory', () => {
  test('카테고리를 선택하지 않은 경우, 에러가 발생한다.', () => {
    const selectedCategory = '';

    expect(() => Validator.validateCategory(selectedCategory)).toThrow(ERROR_MESSAGE.emptyCategory);
  });

  test('정해진 카테고리 외의 값을 선택한 경우, 에러가 발생한다.', () => {
    const selectedCategory = '인도식';

    expect(() => Validator.validateCategory(selectedCategory)).toThrow(
      ERROR_MESSAGE.invalidCategory
    );
  });
});

describe('Validator.validateRestaurantName', () => {
  test('가게 이름을 입력하지 않은 경우, 에러가 발생한다.', () => {
    const inputtedName = '';

    expect(() => Validator.validateRestaurantName(inputtedName)).toThrow(ERROR_MESSAGE.emptyName);
  });
});

describe('Validator.isValidDistance', () => {
  test('정해진 거리 옵션 외의 값을 선택한 경우, false를 반환한다.', () => {
    const selectedDistance = '999';

    const expected = Validator.isValidDistance(selectedDistance);

    expect(expected).toBe(false);
  });

  test('정해진 거리 옵션 내의 값을 선택한 경우, true를 반환한다.', () => {
    const selectedDistance = '5';

    const expected = Validator.isValidDistance(selectedDistance);

    expect(expected).toBe(true);
  });
});

describe('Validator.validateCategory', () => {
  test('거리 옵션을 선택하지 않은 경우, 에러가 발생한다.', () => {
    const selectedDistance = '';

    expect(() => Validator.validateDistance(selectedDistance)).toThrow(ERROR_MESSAGE.emptyDistance);
  });

  test('정해진 거리 옵션 외의 값을 선택한 경우, 에러가 발생한다.', () => {
    const selectedDistance = '999';

    expect(() => Validator.validateDistance(selectedDistance)).toThrow(
      ERROR_MESSAGE.invalidDistance
    );
  });
});
