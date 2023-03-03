import Filter from "../src/domain/Filter";
import { Category, Restaurant } from "../src/type/restaurant";

describe("Filter 객체 테스트", () => {
  const restaurantList: Restaurant[] = [
    {
      name: "맥도날드",
      category: "양식",
      distance: "5",
      description: "",
      link: "",
    },
    {
      name: "롯데리아",
      category: "양식",
      distance: "20",
      description: "",
      link: "",
    },
    {
      name: "버거킹",
      category: "한식",
      distance: "30",
      description: "",
      link: "",
    },
    {
      name: "맘스터치",
      category: "중식",
      distance: "10",
      description: "",
      link: "",
    },
    {
      name: "KFC",
      category: "아시안",
      distance: "15",
      description: "",
      link: "",
    },
  ];
  test("카테고리 필터링하는 함수 테스트", () => {
    expect(Filter.byCategory("양식", restaurantList)).toEqual([
      {
        name: "맥도날드",
        category: "양식",
        distance: "5",
        description: "",
        link: "",
      },
      {
        name: "롯데리아",
        category: "양식",
        distance: "20",
        description: "",
        link: "",
      },
    ]);
  });
});
