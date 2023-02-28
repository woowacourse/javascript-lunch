import { Restaurant, Category, Distance, Cate } from "../src/type/restaurant";
import Restaurants from "../src/domain/Restaurants";

describe("레스토랑 테스트", () => {
  const restaurants = new Restaurants();
  const category: Category = "양식";
  const restaurantList: Restaurant[] = [
    {
      name: "맥도날드",
      category: category,
      distance: 5,
      description: "",
      link: "",
    },
    {
      name: "롯데리아",
      category: category,
      distance: 20,
      description: "",
      link: "",
    },
    {
      name: "버거킹",
      category: category,
      distance: 30,
      description: "",
      link: "",
    },
    {
      name: "맘스터치",
      category: category,
      distance: 10,
      description: "",
      link: "",
    },
    {
      name: "KFC",
      category: category,
      distance: 15,
      description: "",
      link: "",
    },
  ];
  restaurantList.forEach((restaurant: Restaurant) =>
    restaurants.add(restaurant)
  );
  test("음식점 목록 입력 테스트", () => {
    expect(restaurants.getList()).toEqual(restaurantList);
  });

  test("음식점 목록 이름순 정렬 테스트", () => {
    expect(restaurants.sortByName()).toEqual([
      {
        name: "KFC",
        category: category,
        distance: 15,
        description: "",
        link: "",
      },
      {
        name: "롯데리아",
        category: category,
        distance: 20,
        description: "",
        link: "",
      },
      {
        name: "맘스터치",
        category: category,
        distance: 10,
        description: "",
        link: "",
      },
      {
        name: "맥도날드",
        category: category,
        distance: 5,
        description: "",
        link: "",
      },
      {
        name: "버거킹",
        category: category,
        distance: 30,
        description: "",
        link: "",
      },
    ]);
  });

  test("음식점 목록 거리순 정렬 테스트", () => {
    expect(restaurants.sortByDistance()).toEqual([
      {
        name: "맥도날드",
        category: category,
        distance: 5,
        description: "",
        link: "",
      },
      {
        name: "맘스터치",
        category: category,
        distance: 10,
        description: "",
        link: "",
      },
      {
        name: "KFC",
        category: category,
        distance: 15,
        description: "",
        link: "",
      },
      {
        name: "롯데리아",
        category: category,
        distance: 20,
        description: "",
        link: "",
      },
      {
        name: "버거킹",
        category: category,
        distance: 30,
        description: "",
        link: "",
      },
    ]);
  });
});
