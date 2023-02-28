import { Restaurant, Category, Distance } from "../src/type/restaurant";
import Restaurants from "../src/domain/Restaurants";

describe("레스토랑 테스트", () => {
  test("음식점 목록 입력 테스트", () => {
    const restaurants = new Restaurants();
    const category: Category = "양식";
    const distance: Distance = 10;
    const restaurantList = [
      {
        name: "맥도날드",
        category: category,
        distance: distance,
        description: "",
        link: "",
      },
      {
        name: "롯데리아",
        category: category,
        distance: distance,
        description: "",
        link: "",
      },
      {
        name: "버거킹",
        category: category,
        distance: distance,
        description: "",
        link: "",
      },
      {
        name: "맘스터치",
        category: category,
        distance: distance,
        description: "",
        link: "",
      },
      {
        name: "KFC",
        category: category,
        distance: distance,
        description: "",
        link: "",
      },
    ];
    restaurantList.forEach((restaurant: Restaurant) =>
      restaurants.add(restaurant)
    );

    expect(restaurants.getList()).toEqual(restaurantList);
  });
});
