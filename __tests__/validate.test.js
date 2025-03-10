import validate from "../src/utils/validate.js";
import errorMessage from "../src/constants/message.js";

describe("validate", () => {
  describe("정상 케이스", () => {
    it.each([
      ["꽈베기"],
      ["오이"],
      ["상추"],
      ["무"],
      ["배추"],
      ["무".repeat(20)],
    ])("nameLength", (name) => {
      expect(() => validate.nameLength(name)).not.toThrow(
        errorMessage.NAME_LENGTH
      );
    });

    it.each([
      ["여기 맛집임."],
      ["이거 레알"],
      ["반박 불가"],
      ["굳".repeat(299)],
    ])("descLength", (desc) => {
      expect(() => validate.descLength(desc)).not.toThrow(
        errorMessage.DESC_LENGTH
      );
    });

    it.each([
      ["https://www.google.com"],
      ["http://www.naver.com"],
      ["https://www.naver.com"],
      ["http://www.google.com"],
      [""],
      ["www.google.com"],
    ])("linkForm", (link) => {
      expect(() => validate.linkForm(link)).not.toThrow(errorMessage.LINK_FORM);
    });
  });

  describe("예외 케이스", () => {
    it.each([["꽈베기".repeat(7)], [""]])("nameLength", (name) => {
      expect(() => validate.nameLength(name)).toThrow(errorMessage.NAME_LENGTH);
    });

    it("descLength", () => {
      expect(() => validate.descLength("ㅎ".repeat(301))).toThrow(
        errorMessage.DESC_LENGTH
      );
    });

    it.each([
      ["www."],
      ["www.naver"],
      ["ww.naver.com"],
      ["wwwnaver.com"],
      ["http://www.naver,com"],
      ["http://www,naver.com"],
      ["https://www,naver.com"],
    ])("linkForm", (link) => {
      expect(() => validate.linkForm(link)).toThrow(errorMessage.LINK_FORM);
    });
  });
});
