import { MESSAGES } from "../src/constants/messages";
import { ERRORS } from "../src/constants/errors";
import {
  validateNameInput,
  validateDescriptionInput,
  validateSelectInput,
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
      expect(() => validateDescriptionInput(input)).toThrow(
        ERRORS.EMPTY_DESCRIPTION
      );
    });
    it("설명의 입력 값은 1500자를 넘길 수 없다.", () => {
      // given
      const input = "a".repeat(MESSAGES.MAXIMUM_DESCRIPTION_LENGTH + 1);

      // then
      expect(() => validateDescriptionInput(input)).toThrow(
        ERRORS.MAXIMUM_DESCRIPTION
      );
    });
  });

  describe("카테고리 입력 테스트", () => {
    it("카테고리 드롭박스를 선택하지 않으면 추가할수 없다.", () => {
      const input = "error";

      expect(() => validateSelectInput(input)).toThrow(ERRORS.NON_SELECTED);
    });
  });
});
