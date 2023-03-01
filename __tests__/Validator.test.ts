import Validator from '../src/domain/Validator';

describe('카테고리 유효성 검사', () => {
  test.each([['몰?루'], [''], ['한식1'], [' 한식']])(
    '(실패 사례) 카테고리 입력값 %s 유효성 검사',
    (input) => {
      expect(() => Validator.checkCategory(input)).toThrow('에러 1');
    }
  );

  test.each([['한식'], ['중식'], ['일식'], ['아시안'], ['양식'], ['기타']])(
    '(성공 사례) 카테고리 입력값 %s 유효성 검사',
    (input) => {
      expect(() => Validator.checkCategory(input)).not.toThrow();
    }
  );
});

describe('이름 유효성 검사', () => {
  test.each([[''], ['    ']])(
    '(실패 사례) 이름 입력값 %s 유효성 검사',
    (input) => {
      expect(() => Validator.checkName(input)).toThrow('에러 2');
    }
  );

  test.each([
    ['푸만능'],
    ['ChatGPT'],
    ['요술 토끼'],
    ['123'],
    ['몰★루'],
    ['/?! 0%vZ _w'],
  ])('(성공 사례) 이름 입력값 %s 유효성 검사', (input) => {
    expect(() => Validator.checkName(input)).not.toThrow();
  });
});

describe('거리 유효성 검사', () => {
  test.each([[''], ['1'], ['-3'], ['거리']])(
    '(실패 사례) 거리 입력값 %s 유효성 검사',
    (input) => {
      expect(() => Validator.checkDistance(input)).toThrow('에러 3');
    }
  );

  test.each([['5'], ['10'], ['15'], ['20'], ['25'], ['30']])(
    '(성공 사례) 거리 입력값 %s 유효성 검사',
    (input) => {
      expect(() => Validator.checkDistance(input)).not.toThrow();
    }
  );
});

describe('참고 링크 유효성 검사', () => {
  test.each([[''], ['만얼'], ['wwwwoowacom'], ['http:**magic.co.kr']])(
    '(실패 사례) 참고 링크 입력값 %s 유효성 검사',
    (input) => {
      expect(() => Validator.checkLink(input)).toThrow('에러 4');
    }
  );

  test.each([
    ['http://naver.me/abcdefg'],
    ['https://naver.com'],
    ['https://woowacourse.github.io'],
  ])('(성공 사례) 참고 링크 입력값 %s 유효성 검사', (input) => {
    expect(() => Validator.checkLink(input)).not.toThrow();
  });
});
