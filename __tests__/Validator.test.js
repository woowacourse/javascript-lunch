import {
  RESTAURANT_NAME_LENGTH_MAX,
  DESCRIPTION_LENGTH_MAX,
  ERROR_MESSAGE,
} from "../src/constants/constants.js";

import { Validator } from "../src/utils/Validator.js";

describe("Validator 테스트", () => {
  test(`${RESTAURANT_NAME_LENGTH_MAX}자를 넘는 가게 이름은 받을 수 없다.`, () => {
    const LONG_NAME = "a".repeat(RESTAURANT_NAME_LENGTH_MAX + 1);

    expect(() => {
      Validator.name(LONG_NAME);
    }).toThrow(ERROR_MESSAGE.NAME_LENGTH_MAX);
  });

  test(`${DESCRIPTION_LENGTH_MAX}자를 넘는 가게 이름은 받을 수 없다.`, () => {
    const LONG_DESCRIPTION = "a".repeat(DESCRIPTION_LENGTH_MAX + 1);
    expect(() => {
      Validator.description(LONG_DESCRIPTION);
    }).toThrow(ERROR_MESSAGE.DESCRIPTION_MAX);
  });

  test("link형식에 맞지 않는 링크는 입력받을 수 없다.", () => {
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
