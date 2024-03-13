import RESTAURANT from "../../src/constants/restaurant.ts";
import Restaurant from "../../src/domain/Restaurant.ts";

describe("Restaurant 유효성 검증 테스트", () => {
  const restaurantInfo = {
    name: "맛있는 식당",
    category: "한식",
    timeToReach: 10,
    description: "맛있는 식당입니다.",
    link: "https://www.naver.com",
  };

  it("모든 정보를 형식에 맞게 넣었을 때 정상적으로 값이 저장된다", () => {
    const restaurant = new Restaurant(restaurantInfo);

    expect(restaurant.getInfo()).to.deep.equal(restaurantInfo);
  });

  it(`식당 등록 시 식당 이름 글자 수가 ${RESTAURANT.minNameLength} 미만일 경우 에러 발생한다`, () => {
    const shortName = "";

    expect(
      () =>
        new Restaurant({
          ...restaurantInfo,
          name: shortName,
        })
    ).to.throw();
  });

  it(`식당 등록 시 식당 이름 글자 수가 ${RESTAURANT.maxNameLength} 초과일 경우 에러 발생`, () => {
    const longName =
      "식당 이름 이름 식당 이름 이름 식당 이름 이름 식당 이름 이름 식당 이름 이름";

    expect(
      () =>
        new Restaurant({
          ...restaurantInfo,
          name: longName,
        })
    ).to.throw();
  });

  it(`식당 등록 시 식당 카테고리 글자 수가 ${RESTAURANT.minNameLength} 미만일 경우 에러 발생`, () => {
    const shortName = "";

    expect(
      () =>
        new Restaurant({
          ...restaurantInfo,
          category: shortName,
        })
    ).to.throw();
  });

  it(`식당 등록 시 식당 카테고리 글자 수가 ${RESTAURANT.maxCategoryLength} 초과일 경우 에러 발생`, () => {
    const longCategory =
      "식당 카테고리 식당 카테고리 식당 카테고리 식당 카테고리 식당 카테고리 식당 카테고리";

    expect(
      () =>
        new Restaurant({
          ...restaurantInfo,
          category: longCategory,
        })
    ).to.throw();
  });

  it(`식당 등록 시 식당까지의 소요시간(거리)가 ${RESTAURANT.minTimeToReach} 미만일 경우 에러 발생`, () => {
    const shortTimeToReach = 0;

    expect(
      () =>
        new Restaurant({
          ...restaurantInfo,
          timeToReach: shortTimeToReach,
        })
    ).to.throw();
  });

  it(`식당 등록 시 식당까지의 소요시간(거리)가 ${RESTAURANT.maxTimeToReach} 초과일 경우 에러 발생`, () => {
    const longTimeToReach = 61;

    expect(
      () =>
        new Restaurant({
          ...restaurantInfo,
          timeToReach: longTimeToReach,
        })
    ).to.throw();
  });

  it(`식당 등록 시 식당 설명 글자 수가 ${RESTAURANT.minDescriptionLength} 초과일 경우 에러 발생`, () => {
    const longDescription = ".".repeat(RESTAURANT.maxDescriptionLength + 1);

    expect(
      () =>
        new Restaurant({
          ...restaurantInfo,
          description: longDescription,
        })
    ).to.throw();
  });

  it(`식당 등록 시 식당 링크 글자 수가 ${RESTAURANT.maxLinkLength} 초과일 경우 에러 발생`, () => {
    const longLink = ".".repeat(RESTAURANT.maxDescriptionLength + 1);

    expect(
      () =>
        new Restaurant({
          ...restaurantInfo,
          link: longLink,
        })
    ).to.throw();
  });
});
