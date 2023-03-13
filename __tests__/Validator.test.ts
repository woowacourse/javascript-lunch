import Validator from "../src/util/Validator";

test("이름이 공백일 때 true를 반환하는 함수 테스트", () => {
  expect(Validator.isEmptyInput("")).toBeTruthy();
});

test("이름이 공백이 아닐 때 false를 반환하는 함수 테스트", () => {
  expect(Validator.isEmptyInput("역전우동")).toBeFalsy();
});

test("링크가 형식에 맞을 때 true를 반환하는 함수 테스트", () => {
  expect(Validator.isCorrectLink("https://www.woowa.io")).toBeTruthy();
});

test("링크가 형식에 맞을 때 true를 반환하는 함수 테스트", () => {
  expect(
    Validator.isCorrectLink("https://www.woowa.io/qwer/asdf")
  ).toBeTruthy();
});

test("링크에 http(s)가 없을 때 false를 반환하는 함수 테스트", () => {
  expect(Validator.isCorrectLink("www.woowa.io")).toBeFalsy();
});

test("링크에 최상위 도메인명이 없을 때 false를 반환하는 함수 테스트", () => {
  expect(Validator.isCorrectLink("https://woowa")).toBeFalsy();
});
