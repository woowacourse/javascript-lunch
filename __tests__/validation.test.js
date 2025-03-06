import { MESSAGES } from "../src/constants/messages";
import { ERRORS } from "../src/constants/errors";
import {
  validateNameInput,
  validateDescriptiontInput,
} from "../src/validation/validator";

describe("모달 사용자 입력 테스트", () => {
  describe("이름 입력 테스트", () => {
    it("이름의 입력 값은 공백일 수 없다.", () => {
      // given
      const input = "";

      // then
      expect(() => validateNameInput(input)).toThrow(ERRORS.EMPTY_NAME);
    });
    it("이름의 입력 값은 30자를 넘길 수 없다.", () => {
      // given
      const input = "a".repeat(MESSAGES.MAXIMUM_NAME_LENGTH + 1);

      // then
      expect(() => validateNameInput(input)).toThrow(ERRORS.MAXIMUM_NAME);
    });
  });

  describe("설명 입력 테스트", () => {
    it("설명의 입력 값은 공백일 수 없다.", () => {
      // given
      const input = "";

      // then
      expect(() => validateDescriptiontInput(input)).toThrow(
        ERRORS.EMPTY_DESCRIPTION
      );
    });
    it("설명의 입력 값은 1500자를 넘길 수 없다.", () => {
      // given
      const input = "a".repeat(MESSAGES.MAXIMUM_DESCRIPTION_LENGTH + 1);

      // then
      expect(() => validateDescriptiontInput(input)).toThrow(
        ERRORS.MAXIMUM_DESCRIPTION
      );
    });
  });
});
