import { sortByName, sortByDistance } from "../src/utils/Sort";
import { RestaurantForm } from "../src/global/types";

test("음식점 이름순 정렬하기 테스트", () => {
  const sortedName: RestaurantForm[] = sortByName([
    {
      category: "한식",
      name: "patrick",
      distance: 5,
      id: "100",
      favorite: true,
    },
    { category: "중식", name: "lego", distance: 5, id: "100", favorite: true },
    { category: "한식", name: "dori", distance: 5, id: "100", favorite: true },
  ]);
  expect(sortedName).toEqual([
    { category: "한식", name: "dori", distance: 5, id: "100", favorite: true },
    { category: "중식", name: "lego", distance: 5, id: "100", favorite: true },
    {
      category: "한식",
      name: "patrick",
      distance: 5,
      id: "100",
      favorite: true,
    },
  ]);
});

test("거리순 정렬하기 테스트", () => {
  const sortedDistance: RestaurantForm[] = sortByDistance([
    {
      category: "한식",
      name: "patrick",
      distance: 5,
      id: "100",
      favorite: true,
    },
    { category: "중식", name: "lego", distance: 15, id: "100", favorite: true },
    { category: "한식", name: "dori", distance: 10, id: "100", favorite: true },
  ]);
  expect(sortedDistance).toEqual([
    {
      category: "한식",
      name: "patrick",
      distance: 5,
      id: "100",
      favorite: true,
    },
    { category: "한식", name: "dori", distance: 10, id: "100", favorite: true },
    { category: "중식", name: "lego", distance: 15, id: "100", favorite: true },
  ]);
});
