import {
  RESTAURANT_NAME_LENGTH_MAX,
  DESCRIPTION_LENGTH_MAX,
  ERROR_MESSAGE,
} from "../src/constants/constants.js";

import { Validator } from "../src/utils/Validator.js";

describe("Validator 테스트", () => {
  test(`가게 이름이 ${RESTAURANT_NAME_LENGTH_MAX}자를 넘어가면 예외가 발생한다.`, () => {
    const CORRECT_NAME = "a".repeat(RESTAURANT_NAME_LENGTH_MAX - 1);
    const LONG_NAME = "a".repeat(RESTAURANT_NAME_LENGTH_MAX + 1);

    expect(() => {
      Validator.name(CORRECT_NAME);
    }).not.toThrow(ERROR_MESSAGE.NAME_LENGTH_MAX);

    expect(() => {
      Validator.name(LONG_NAME);
    }).toThrow(ERROR_MESSAGE.NAME_LENGTH_MAX);
  });

  test(`설명이 ${DESCRIPTION_LENGTH_MAX}자를 넘어가면 예외가 발생한다.`, () => {
    const CORRECT_DESCRIPTION = "a".repeat(DESCRIPTION_LENGTH_MAX - 1);
    const LONG_DESCRIPTION = "a".repeat(DESCRIPTION_LENGTH_MAX + 1);

    expect(() => {
      Validator.description(CORRECT_DESCRIPTION);
    }).not.toThrow(ERROR_MESSAGE.DESCRIPTION_MAX);

    expect(() => {
      Validator.description(LONG_DESCRIPTION);
    }).toThrow(ERROR_MESSAGE.DESCRIPTION_MAX);
  });

  test("link가 링크 형식에 맞지 않으면 예외가 발생한다.", () => {
    const wrongLink = "링크";
    const correctLink = "https://www.woowacourse.io/";
    expect(() => {
      Validator.link(wrongLink);
    }).toThrow(ERROR_MESSAGE.LINK);

    expect(() => {
      Validator.link(correctLink);
    }).not.toThrow(ERROR_MESSAGE.LINK);
  });
});
