import { sort } from "../src/domain/Sort";
import PersonalRestaurant from "../src/type/PersonalRestaurant";

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

test("음식점 목록 이름순 정렬 테스트", () => {
  expect(sort("name", restaurantList)).toEqual([
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
        name: "버거킹",
        category: "한식",
        estimatedTime: "30",
        description: "",
        link: "",
      },
      favorite: false,
    },
  ]);
});

test("음식점 목록 거리순 정렬 테스트", () => {
  expect(sort("distance", restaurantList)).toEqual([
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
  ]);
});
