import { sortByName } from "../src/utils/Sort";

test("음식점 이름 순 정렬하기 테스트", () => {
  const sortedName: string[] = sortByName(["cc", "bb", "aa"]);
  expect(sortedName).toEqual(["aa", "bb", "cc"]);
});
