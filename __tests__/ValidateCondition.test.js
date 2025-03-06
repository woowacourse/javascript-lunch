import { ERROR_MESSAGE } from "../src/constants/errorMessage.js";
import { validateRequiredInput } from "../src/validate/validateCondition.js";

describe("사용자 입력값에 따른 유효성 검사를 실시한다", () => {
  it("필수 입력 항목이 비어있는 경우 에러를 던진다", () => {
    //given
    const input = "";

    //when

    //then
    expect(() => validateRequiredInput(input)).toThrow(ERROR_MESSAGE.requird);
  });
});
