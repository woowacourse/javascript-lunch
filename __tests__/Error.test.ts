import RestaurantValidator from "../src/domain/RestaurantValidator";

test("공백 카테고리면 에러 발생", () => {
  expect(() => RestaurantValidator.checkCategory("")).toThrow();
});

test("공백 거리(걸리는 시간)면 에러 발생", () => {
  expect(() => RestaurantValidator.checkDistance("")).toThrow();
});

test("공백 이름이면 에러 발생", () => {
  expect(() => RestaurantValidator.checkName("")).toThrow();
});

test("올바른 이름이면 에러 발생하지 않음", () => {
  expect(() => RestaurantValidator.checkName("역전우동")).not.toThrow();
});

test("잘못된 URL이면 에러 발생", () => {
  expect(() => RestaurantValidator.checkLink("https://www.naver")).toThrow();
});

test("올바른 URL이면 에러 발생하지 않음", () => {
  expect(() => RestaurantValidator.checkLink("https://www.naver.com")).not.toThrow();
});
