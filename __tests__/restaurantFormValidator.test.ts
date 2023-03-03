import restaurantFormValidator from "../src/validators/restaurantFormValidator";
import { Restaurant } from "../src/types/types";

describe("restaurantFromValidator 테스트", () => {
  test("카테고리를 선택하지 않았으면 true를 반환한다", () => {
    const category = "";

    expect(restaurantFormValidator.isEmptyCategory(category)).toBeTruthy();
  });

  test("카테고리를 선택했으면 false를 반환한다", () => {
    const category = "양식";

    expect(restaurantFormValidator.isEmptyCategory(category)).toBeFalsy();
  });

  test("거리를 선택하지 않았으면 true를 반환한다", () => {
    const distance = 0;

    expect(restaurantFormValidator.isEmptyDistance(distance)).toBeTruthy();
  });

  test("거리를 선택했으면 false를 반환한다", () => {
    const distance = 5;

    expect(restaurantFormValidator.isEmptyDistance(distance)).toBeFalsy();
  });

  test.each(["", "👍", "(안녕)"])(
    `음식점 이름에 한글, 영어, 숫자, !@#$%^&*?'",.를 제외한 문자를 포함하면 true를 반환한다`,
    (name) => {
      expect(restaurantFormValidator.isInvalidName(name)).toBeTruthy();
    }
  );

  test.each(["딘타이펑", "Shake Shack", "안녕!?"])(
    `음식점 이름에 한글, 영어, 숫자, !@#$%^&*?'",.를 제외한 문자를 포함하지 않으면 false를 반환한다`,
    (name) => {
      expect(restaurantFormValidator.isInvalidName(name)).toBeFalsy();
    }
  );

  test.each(["hello", "안녕"])(
    "유효하지 않은 링크 형식이면 true를 반환한다",
    (link) => {
      expect(restaurantFormValidator.isInvalidLink(link)).toBeTruthy();
    }
  );

  test.each(["", "https://www.hello.com", "hello.com", "www.hello.co.kr"])(
    "유효한 링크 형식이면 false를 반환한다",
    (link) => {
      expect(restaurantFormValidator.isInvalidLink(link)).toBeFalsy();
    }
  );

  test.each([
    [
      { category: "", name: "", distance: 0, description: "", link: "abc" },
      { category: true, name: true, distance: true, link: true },
    ],
    [
      {
        category: "한식",
        name: "얌샘김밥",
        distance: 0,
        description: "",
        link: "",
      },
      { category: false, name: false, distance: true, link: false },
    ],
  ])(
    "음식점 추가 폼 제출시 각 인풋에 대한 에러 여부를 포함한 객체를 반환한다",
    (restaurantItem, errors) => {
      expect(
        restaurantFormValidator.verify(restaurantItem as Restaurant)
      ).toEqual(errors);
    }
  );
});
