describe("모달 사용자 입력 테스트", () => {
  describe("이름 입력 테스트", () => {
    it("이름의 입력 값은 공백일 수 없다.", () => {
      // given
      const input = "";

      // then
      expect(() => validateNameInput(input)).toThrow();
    });
    it("이름의 입력 값은 30자를 넘길 수 없다.", () => {
      // given
      const input = "a".repeat(31);

      // then
      expect(() => validateNameInput(input)).toThrow();
    });
  });

  describe("설명 입력 테스트", () => {
    it("설명의 입력 값은 공백일 수 없다.", () => {
      // given
      const input = "";

      // then
      expect(() => validateDescriptiontInput(input)).toThrow();
    });
    it("설명의 입력 값은 1500자를 넘길 수 없다.", () => {
      // given
      const input = "a".repeat(1501);

      // then
      expect(() => validateDescriptiontInput(input)).toThrow();
    });
  });
});
