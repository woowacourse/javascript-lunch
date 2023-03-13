import Filter from "../src/domain/Filter";
import PersonalRestaurant from "../src/type/PersonalRestaurant";

describe("Filter 객체 테스트", () => {
  const restaurantList: PersonalRestaurant[] = [
    {
      restaurant: {
        name: "맥도날드",
        category: "양식",
        estimatedTime: "5",
        description: "",
        link: "",
      },
      favorite: false,
    },
    {
      restaurant: {
        name: "롯데리아",
        category: "양식",
        estimatedTime: "20",
        description: "",
        link: "",
      },
      favorite: true,
    },
    {
      restaurant: {
        name: "버거킹",
        category: "한식",
        estimatedTime: "30",
        description: "",
        link: "",
      },
      favorite: false,
    },
    {
      restaurant: {
        name: "맘스터치",
        category: "중식",
        estimatedTime: "10",
        description: "",
        link: "",
      },
      favorite: true,
    },
    {
      restaurant: {
        name: "KFC",
        category: "아시안",
        estimatedTime: "15",
        description: "",
        link: "",
      },
      favorite: false,
    },
  ];

  test("카테고리 필터링하는 함수 테스트", () => {
    expect(Filter.byCategory("양식", restaurantList)).toEqual([
      {
        restaurant: {
          name: "맥도날드",
          category: "양식",
          estimatedTime: "5",
          description: "",
          link: "",
        },
        favorite: false,
      },
      {
        restaurant: {
          name: "롯데리아",
          category: "양식",
          estimatedTime: "20",
          description: "",
          link: "",
        },
        favorite: true,
      },
    ]);
  });

  test("자주 가는 음식점 필터링하는 함수 테스트", () => {
    expect(Filter.byFavorite(restaurantList)).toEqual([
      {
        restaurant: {
          name: "롯데리아",
          category: "양식",
          estimatedTime: "20",
          description: "",
          link: "",
        },
        favorite: true,
      },
      {
        restaurant: {
          name: "맘스터치",
          category: "중식",
          estimatedTime: "10",
          description: "",
          link: "",
        },
        favorite: true,
      },
    ]);
  });
});
