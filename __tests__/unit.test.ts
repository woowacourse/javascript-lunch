import { sortByName, sortByNumber } from "../src/utils/Sort";
import { RestaurantList } from "../src/domain/RestaurantList";
import { RestaurantForm } from "../src/domain/Restaurant";

test("음식점 이름순 정렬하기 테스트", () => {
  const sortedName: string[] = sortByName(["cc", "bb", "aa"]);
  expect(sortedName).toEqual(["aa", "bb", "cc"]);
});

test("거리순 정렬하기 테스트", () => {
  const sortedDistance: number[] = sortByNumber([3, 7, 4, 6, 9, 2, 5, 1]);
  expect(sortedDistance).toEqual([1, 2, 3, 4, 5, 6, 7, 9]);
});

test("카테고리별 필터링 후 확인", () => {
  const category: RestaurantForm[] = [
    { category: "한식", name: "patrick", distance: 5 },
    { category: "중식", name: "lego", distance: 5 },
    { category: "한식", name: "dori", distance: 5 },
    {
      category: "양식",
      name: "haha",
      distance: 5,
    },
  ];
  const restaurant = new RestaurantList();
  restaurant.add(category[0]);
  restaurant.add(category[1]);
  restaurant.add(category[2]);
  restaurant.add(category[3]);

  expect(restaurant.categoryFilter("한식")).toEqual([
    { category: "한식", name: "patrick", distance: 5 },
    { category: "한식", name: "dori", distance: 5 },
  ]);
});
