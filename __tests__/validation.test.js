describe("모달 사용자 입력 테스트", () => {
  beforeEach(() => {});
  it("이름의 입력 값은 공백일 수 없다.", () => {
    // given
    const input = "";

    // then
    expect(() => validateInputValue(input)).toThrow();
  });
  it("이름의 입력 값은 30자를 넘길 수 없다.", () => {
    // given
    const input = "a".repeat(31);

    // then
    expect(() => validateInputValue(input)).toThrow();
  });
});
