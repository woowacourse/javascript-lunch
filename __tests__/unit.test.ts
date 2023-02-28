import { sortByName, sortByNumber } from "../src/utils/Sort";

test("음식점 이름순 정렬하기 테스트", () => {
  const sortedName: string[] = sortByName(["cc", "bb", "aa"]);
  expect(sortedName).toEqual(["aa", "bb", "cc"]);
});

test("거리순 정렬하기 테스트", () => {
  const sortedDistance: number[] = sortByNumber([3, 7, 4, 6, 9, 2, 5, 1]);
  expect(sortedDistance).toEqual([1, 2, 3, 4, 5, 6, 7, 9]);
});
