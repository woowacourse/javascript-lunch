import { sortByName, sortByDistance } from "../src/utils/Sort";
import { RestaurantForm } from "../src/domain/Restaurant";

test("음식점 이름순 정렬하기 테스트", () => {
  const sortedName: RestaurantForm[] = sortByName([
    { category: "한식", name: "patrick", distance: 5 },
    { category: "중식", name: "lego", distance: 5 },
    { category: "한식", name: "dori", distance: 5 },
  ]);
  expect(sortedName).toEqual([
    { category: "한식", name: "dori", distance: 5 },
    { category: "중식", name: "lego", distance: 5 },
    { category: "한식", name: "patrick", distance: 5 },
  ]);
});

test("거리순 정렬하기 테스트", () => {
  const sortedDistance: RestaurantForm[] = sortByDistance([
    { category: "한식", name: "patrick", distance: 5 },
    { category: "중식", name: "lego", distance: 15 },
    { category: "한식", name: "dori", distance: 10 },
  ]);
  expect(sortedDistance).toEqual([
    { category: "한식", name: "patrick", distance: 5 },
    { category: "한식", name: "dori", distance: 10 },
    { category: "중식", name: "lego", distance: 15 },
  ]);
});
