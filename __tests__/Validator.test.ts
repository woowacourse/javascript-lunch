import { ERROR_MESSAGE } from '../src/constant';
import Validator from '../src/domain/Validator';

describe('카테고리 유효성 검사', () => {
  test.each([['몰?루'], [''], ['한식1'], [' 한식']])(
    '카테고리 입력값 %s가 입력되었을 때 에러 발생',
    (input) => {
      expect(() => Validator.checkCategory(input)).toThrow(
        ERROR_MESSAGE.category
      );
    }
  );
  test.each([['한식'], ['중식'], ['일식'], ['아시안'], ['양식'], ['기타']])(
    '카테고리 입력값 %s가 입력되었을 때 정상 동작(에러 발생 X)',
    (input) => {
      expect(() => Validator.checkCategory(input)).not.toThrow();
    }
  );
});

describe('이름 유효성 검사', () => {
  test.each([[''], ['    ']])(
    '이름 입력값 %s가 입력되었을 때 에러 발생',
    (input) => {
      expect(() => Validator.checkName(input)).toThrow(ERROR_MESSAGE.name);
    }
  );

  test.each([
    ['푸만능'],
    ['ChatGPT'],
    ['요술 토끼'],
    ['123'],
    ['몰★루'],
    ['/?! 0%vZ _w'],
  ])('이름 입력값 %s가 입력되었을 때 정상 동작(에러 발생 X)', (input) => {
    expect(() => Validator.checkName(input)).not.toThrow();
  });
});

describe('거리 유효성 검사', () => {
  test.each([[''], ['1'], ['-3'], ['거리']])(
    '거리 입력값 %s가 입력되었을 때 에러 발생',
    (input) => {
      expect(() => Validator.checkDistance(input)).toThrow(
        ERROR_MESSAGE.distance
      );
    }
  );

  test.each([['5'], ['10'], ['15'], ['20'], ['25'], ['30']])(
    '거리 입력값 %s가 입력되었을 때 정상 동작(에러 발생 X)',
    (input) => {
      expect(() => Validator.checkDistance(input)).not.toThrow();
    }
  );
});

describe('참고 링크 유효성 검사', () => {
  test.each([[''], ['만얼'], ['wwwwoowacom'], ['http:**magic.co.kr']])(
    '참고 링크 입력값 %s가 입력되었을 때 에러 발생',
    (input) => {
      expect(() => Validator.checkLink(input)).toThrow(ERROR_MESSAGE.link);
    }
  );

  test.each([
    ['http://naver.me/abcdefg'],
    ['https://naver.com'],
    ['https://woowacourse.github.io'],
  ])('참고 링크 입력값 %s가 입력되었을 때 정상 동작(에러 발생 X)', (input) => {
    expect(() => Validator.checkLink(input)).not.toThrow();
  });
});
