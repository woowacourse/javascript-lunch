import inputCheck from "../src/inputCheck";

test("공백 이름이면 에러 발생", () => {
  expect(() => inputCheck("", "https://www.naver.com")).toThrow("[ERROR]");
});

test("유효하지 않은 URL이면 에러 발생", () => {
  expect(() => inputCheck("역전우동", "//www.naver.com")).toThrow("[ERROR]");
});
