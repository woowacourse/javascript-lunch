import Input from "../src/Input";

test("공백 이름이면 에러 발생", () => {
  expect(() => Input.checkName("")).toThrow("[ERROR]");
});

test("올바른 이름이면 에러 발생하지 않음", () => {
  expect(() => Input.checkName("역전우동")).not.toThrow("[ERROR]");
});

test("잘못된 URL이면 에러 발생", () => {
  expect(() => Input.checkLink("https://www.naver")).toThrow("[ERROR]");
});

test("올바른 URL이면 에러 발생하지 않음", () => {
  expect(() => Input.checkLink("https://www.naver.com")).not.toThrow("[ERROR]");
});
