import {
  RESTAURANT_NAME_LENGTH_MAX,
  DESCRIPTION_LENGTH_MAX,
  ERROR_MESSAGE,
} from "../src/constants/constants.js";

import { Validator } from "../src/utils/Validator.js";

describe("Validator 테스트", () => {
  test(`${RESTAURANT_NAME_LENGTH_MAX}자를 넘는 가게 이름은 받을 수 없다.`, () => {
    const wrongName =
      "안녕하세요저는밍고에요테스트케이스를작성해야하는데20자를넘겨야해요잘부탁드립니다.";

    expect(() => {
      Validator.name(wrongName);
    }).toThrow(ERROR_MESSAGE.NAME_LENGTH_MAX);
  });

  test(`${DESCRIPTION_LENGTH_MAX}자를 넘는 가게 이름은 받을 수 없다.`, () => {
    const wrongDescription =
      "안녕하세요이제는300자를넘겨야하네요조금은엉성한코드일수있겠지만아무쪼록잘부탁드립니다.300자를넘기기위해선어떤이야기를해야할까요?오늘점심은제가우육면을먹었어요사실다적었었는데중간에라이브쉐어가꺼져서300자를적어놓고82자밖에남지않았어요너무억울해서조금만복붙하겠습니다안녕하세요이제는300자를넘겨야하네요조금은엉성한코드일수있겠지만아무쪼록잘부탁드립니다.300자를넘기기위해선어떤이야기를해야할까요?오늘점심은제가우육면을먹었어요사실다적었었는데중간에라이브쉐어가꺼져서300자를적어놓고82자밖에남지않았어요너무억울해서조금만복붙하겠습니다";
    expect(() => {
      Validator.description(wrongDescription);
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
