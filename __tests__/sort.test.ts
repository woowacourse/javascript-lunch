import { sort } from "../src/domain/Sort";
import { Category, Restaurant } from "../src/type/restaurant";

const category: Category = "양식";
const restaurantList: Restaurant[] = [
  {
    name: "맥도날드",
    category: category,
    distance: "5",
    description: "",
    link: "",
  },
  {
    name: "롯데리아",
    category: category,
    distance: "20",
    description: "",
    link: "",
  },
  {
    name: "버거킹",
    category: category,
    distance: "30",
    description: "",
    link: "",
  },
  {
    name: "맘스터치",
    category: category,
    distance: "10",
    description: "",
    link: "",
  },
  {
    name: "KFC",
    category: category,
    distance: "15",
    description: "",
    link: "",
  },
];

test("음식점 목록 이름순 정렬 테스트", () => {
  expect(sort("name", restaurantList)).toEqual([
    {
      name: "KFC",
      category: category,
      distance: "15",
      description: "",
      link: "",
    },
    {
      name: "롯데리아",
      category: category,
      distance: "20",
      description: "",
      link: "",
    },
    {
      name: "맘스터치",
      category: category,
      distance: "10",
      description: "",
      link: "",
    },
    {
      name: "맥도날드",
      category: category,
      distance: "5",
      description: "",
      link: "",
    },
    {
      name: "버거킹",
      category: category,
      distance: "30",
      description: "",
      link: "",
    },
  ]);
});

test("음식점 목록 거리순 정렬 테스트", () => {
  expect(sort("distance", restaurantList)).toEqual([
    {
      name: "맥도날드",
      category: category,
      distance: "5",
      description: "",
      link: "",
    },
    {
      name: "맘스터치",
      category: category,
      distance: "10",
      description: "",
      link: "",
    },
    {
      name: "KFC",
      category: category,
      distance: "15",
      description: "",
      link: "",
    },
    {
      name: "롯데리아",
      category: category,
      distance: "20",
      description: "",
      link: "",
    },
    {
      name: "버거킹",
      category: category,
      distance: "30",
      description: "",
      link: "",
    },
  ]);
});
