import { Restaurant } from "../src/domains/restaurant.ts";
import {
  filterAndSortRestaurants,
  getFavoriteRestaurants,
} from "../src/domains/restaurantUtils.ts";

describe("Restaurant Utilities Domain Logic", () => {
  // 테스트용 예시 음식점 데이터
  const restaurants: Restaurant[] = [
    {
      id: "1",
      category: "한식",
      name: "A 식당",
      distance: 10,
      isFavorite: false,
    },
    {
      id: "2",
      category: "일식",
      name: "B 식당",
      distance: 5,
      isFavorite: true,
    },
    {
      id: "3",
      category: "한식",
      name: "C 식당",
      distance: 7,
      isFavorite: false,
    },
    {
      id: "4",
      category: "중식",
      name: "D 식당",
      distance: 12,
      isFavorite: true,
    },
  ];

  describe("filterAndSortRestaurants", () => {
    test("전체 카테고리, 이름순 정렬: 모든 음식점을 이름순으로 정렬하여 반환", () => {
      const filtered = filterAndSortRestaurants(restaurants, "전체", "name");
      // 이름순 정렬: A, B, C, D
      expect(filtered.map((r) => r.name)).toEqual([
        "A 식당",
        "B 식당",
        "C 식당",
        "D 식당",
      ]);
    });

    test("한식 카테고리, 거리순 정렬: 한식 음식점만 거리순(오름차순)으로 정렬하여 반환", () => {
      const filtered = filterAndSortRestaurants(
        restaurants,
        "한식",
        "distance"
      );
      // 한식 음식점: A 식당(10), C 식당(7) -> 거리 오름차순이면 C, A 순
      expect(filtered.map((r) => r.name)).toEqual(["C 식당", "A 식당"]);
    });

    test("한식 카테고리, 이름순 정렬: 한식 음식점만 이름순으로 정렬하여 반환", () => {
      const filtered = filterAndSortRestaurants(restaurants, "한식", "name");
      // 한식 음식점: A 식당, C 식당 -> 이름순: A, C
      expect(filtered.map((r) => r.name)).toEqual(["A 식당", "C 식당"]);
    });
  });

  describe("getFavoriteRestaurants", () => {
    test("즐겨찾기 음식점만 반환", () => {
      const favorites = getFavoriteRestaurants(restaurants);
      // 즐겨찾기: B 식당, D 식당
      expect(favorites.map((r) => r.name)).toEqual(["B 식당", "D 식당"]);
    });
  });
});
