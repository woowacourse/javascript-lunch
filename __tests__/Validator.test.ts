// @ts-nocheck

import Validator from '../src/domain/Validator';
import { correctUserInputs } from '../testcase/unit-testcase';
import { ERROR_MESSAGE } from '../src/constant';

describe('레스토랑 유효성 검사 테스트 (Validator)', () => {
  const validator = new Validator();
  test.each([correctUserInputs])(
    '정상적인 레스토랑의 정보가 주어졌다면 오류가 발생하지 않아야 한다.',
    (testcase) => {
      expect(() => validator.errorIfInvalidRestaurant(testcase)).not.toThrow();
    }
  );

  test('레스토랑의 카테고리를 고르지 않아 값이 비어있는 경우 카테고리 오류를 발생시켜야 한다.', () => {
    const testcase = {
      category: '',
      name: '차이나타운',
      distanceInMinutes: '20',
      description: '가     나다   라   마바  사  ',
      link: 'https://chinatown.com/',
    };
    expect(() => validator.errorIfInvalidRestaurant(testcase)).toThrow(
      ERROR_MESSAGE.categoryIsEmpty
    );
  });

  test('레스토랑의 이름이 비어있는 경우 이름 관련 오류를 발생시켜야 한다.', () => {
    const testcase = {
      category: '중식',
      name: '',
      distanceInMinutes: '20',
      description: '    ',
      link: 'https://chinatown.com/',
    };
    expect(() => validator.errorIfInvalidRestaurant(testcase)).toThrow(
      ERROR_MESSAGE.nameIsEmpty
    );
  });

  test('레스토랑의 이름이 공백만으로 이루어진 경우 이름 관련 오류를 발생시켜야 한다.', () => {
    const testcase = {
      category: '중식',
      name: '    ',
      distanceInMinutes: '15',
      description: 'Test Message',
      link: 'https://chinatown.com/',
    };
    expect(() => validator.errorIfInvalidRestaurant(testcase)).toThrow(
      ERROR_MESSAGE.nameIsEmpty
    );
  });

  test('레스토랑의 거리를 선택하지 않아 거리 값이 비어있는 경우 거리 관련 오류를 발생시켜야 한다.', () => {
    const testcase = {
      category: '중식',
      name: '차이나타운',
      distanceInMinutes: '',
      description: '',
      link: 'https://chinatown.com/',
    };
    expect(() => validator.errorIfInvalidRestaurant(testcase)).toThrow(
      ERROR_MESSAGE.distanceInMinutesIsEmpty
    );
  });

  test('링크가 올바르지 않을 경우 링크 관련 오류를 발생시켜야 한다.', () => {
    const testcase = {
      category: '중식',
      name: '차이나타운',
      distanceInMinutes: '5',
      description: '대충 여기에 설명',
      link: 'htt://chinatown.com/',
    };
    expect(() => validator.errorIfInvalidRestaurant(testcase)).toThrow(
      ERROR_MESSAGE.linkIsInvalid
    );
  });

  test('링크가 올바르지 않을 경우 링크 관련 오류를 발생시켜야 한다.', () => {
    const testcase = {
      category: '중식',
      name: '차이나타운',
      distanceInMinutes: '5',
      description: '대충 여기에 설명',
      link: 'chinatowncom',
    };
    expect(() => validator.errorIfInvalidRestaurant(testcase)).toThrow(
      ERROR_MESSAGE.linkIsInvalid
    );
  });

  test('링크가 올바르지 않을 경우 링크 관련 오류를 발생시켜야 한다.', () => {
    const testcase = {
      category: '중식',
      name: '차이나타운',
      distanceInMinutes: '5',
      description: '대충 여기에 설명',
      link: 'ChinaTown.',
    };
    expect(() => validator.errorIfInvalidRestaurant(testcase)).toThrow(
      ERROR_MESSAGE.linkIsInvalid
    );
  });
});
