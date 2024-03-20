import { CATEGORY } from "../../src/constants/category";
import Restaurant from "../../src/domain/Restaurant";
import Restaurants from "../../src/domain/Restaurants";

const createRestaurant = (name) => {
  return new Restaurant({
    name,
    category: CATEGORY.korean,
    timeToReach: 10,
    description: "맛있는 식당입니다.",
    link: "https://www.naver.com",
  });
};

describe("Restaurants 유닛 테스트", () => {
  const kimbobHeavenName = "김밥천국";
  const sushiHeavenName = "스시천국";

  const kimbobHeaven = createRestaurant(kimbobHeavenName);
  const sushiHeaven = createRestaurant(sushiHeavenName);
  const kimbobHeavenBranch = createRestaurant(kimbobHeavenName);

  it("모든 정보를 형식에 맞게 넣었을 때 정상적으로 값이 저장된다", () => {
    const restaurants = new Restaurants([kimbobHeaven, sushiHeaven]);

    expect(restaurants.getDetails()).to.deep.equal([
      kimbobHeaven.getInfo(),
      sushiHeaven.getInfo(),
    ]);
  });

  it("생성자 호출 시 식당 이름이 중복될 경우 에러 발생", () => {
    expect(
      () => new Restaurants([kimbobHeaven, kimbobHeavenBranch])
    ).to.throw();
  });

  it("add 메서드 호출 시 식당 이름이 중복되지 않은 경우 프로퍼티에 식당 추가", () => {
    const restaurants = new Restaurants([kimbobHeaven]);
    restaurants.add(sushiHeaven);

    expect(restaurants.getDetails()).to.deep.equal([
      kimbobHeaven.getInfo(),
      sushiHeaven.getInfo(),
    ]);
  });

  it("add 메서드 호출 시 식당 이름이 중복될 경우 에러 발생", () => {
    const restaurants = new Restaurants([kimbobHeaven, sushiHeaven]);

    expect(() => restaurants.add(kimbobHeavenBranch)).to.throw();
  });
});
