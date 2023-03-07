import validator from '../src/validation/validator';

// eslint-disable-next-line max-lines-per-function
describe('음식점 추가 Form에서 입력값에 대한 유효성 검사', () => {
  test('유효한 음식점 이름은 20자 이하이며 특수기호는 제외한다.', () => {
    expect(validator.checkName('jero')).toBe(undefined);
  });

  test('음식점 이름이 공백이면 유효하지 않다.', () => {
    const name = '';
    expect(() => {
      validator.checkName(name);
    }).toThrow();
  });

  test('음식점 이름이 알파벳, 한글, 숫자 이외의 문자가 포함되면 유효하지 않다.', () => {
    const name = '/*jero*/';
    expect(() => {
      validator.checkName(name);
    }).toThrow();
  });

  test('음식점 이름이 20자를 초과하면 유효하지 않다.', () => {
    const name = 'abcdabcdabcdabcdabcdabcdabcd';
    expect(() => {
      validator.checkName(name);
    }).toThrow();
  });

  test('음식점 설명은 50자를 초과하면 유효하지 않다.', () => {
    const description =
      '이 음식점은 최고의 맛을 자랑하는 50년 전통의 국밥집입니다.\n이 음식점은 최고의 맛을 자랑하는 50년 전통의 국밥집입니다. 이 음식점은 최고의 맛을 자랑하는 50년 전통의 국밥집입니다. 이 음식점은 최고의 맛을 자랑하는 50년 전통의 국밥집입니다. 이 음식점은 최고의 맛을 자랑하는 50년 전통의 국밥집입니다. 이 음식점은 최고의 맛을 자랑하는 50년 전통의 국밥집입니다. 이 음식점은 최고의 맛을 자랑하는 50년 전통의 국밥집입니다. 이 음식점은 최고의 맛을 자랑하는 50년 전통의 국밥집입니다. 이 음식점은 최고의 맛을 자랑하는 50년 전통의 국밥집입니다. ';
    expect(() => {
      validator.checkDescription(description);
    }).toThrow();
  });

  test('음식점 링크가 형식에 맞지 않으면 유효하지 않다.', () => {
    const link = 'www.google.com"';
    expect(() => {
      validator.checkLinkFormat(link);
    }).toThrow();
  });
});
