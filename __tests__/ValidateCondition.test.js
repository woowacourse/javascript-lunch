import { ERROR_MESSAGE } from "../src/constants/errorMessage.js";
import {
  DESCRIPTION_MAX_LENGTH,
  NAME_MAX_LENGTH,
} from "../src/constants/constants.js";
import {
  validateLength,
  validateNameLength,
  validateRequiredInput,
  validateURL,
} from "../src/validate/validateCondition.js";

describe("사용자 입력값에 따른 유효성 검사를 실시한다", () => {
  it("필수 입력 항목이 비어있는 경우 에러를 던진다", () => {
    //given
    const input = "";

    //when

    //then
    expect(() => validateRequiredInput(input)).toThrow(ERROR_MESSAGE.requird);
  });

  it("음식점 이름이 20자가 넘을 경우 에러를 던진다", () => {
    //given
    const input = "음식점이름이 20자가 넘을 경우 에러를 던진다";

    //when

    //then
    expect(() => validateLength(input, NAME_MAX_LENGTH)).toThrow(
      ERROR_MESSAGE.length(NAME_MAX_LENGTH)
    );
  });
  it("음식점 설명이 200자가 넘을 경우 에러를 던진다", () => {
    //given
    const input = "-".repeat(300);

    //when

    //then
    expect(() => validateLength(input, DESCRIPTION_MAX_LENGTH)).toThrow(
      ERROR_MESSAGE.length(DESCRIPTION_MAX_LENGTH)
    );
  });

  it("음식점 참고 링크가 링크 형식이 아닐 경우 에러를 던진다.", () => {
    //given
    const input = "url";

    //when

    //then
    expect(() => validateURL(input)).toThrow(ERROR_MESSAGE.url);
  });
});
