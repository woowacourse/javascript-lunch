import { describe, expect, test } from "@jest/globals";
import RestaurantListUtils from "../src/utils/RestaurantListUtils.ts";
import { Restaurant } from "../types/global";

describe("RestaurantList 유틸 함수 테스트", () => {
  const restaurantList: Restaurant[] = [
    { id: 0, label: "한식", name: "한식집", distance: 10, favorite: false },
    { id: 1, label: "일식", name: "초밥집", distance: 5, favorite: false },
    { id: 2, label: "양식", name: "돈가스집", distance: 15, favorite: false },
    { id: 3, label: "한식", name: "국밥집", distance: 20, favorite: false },
  ];

  test("음식점 정보를 주면 음식점을 새로 추가한 List를 반환한다.", () => {
    const newRestaurant: Restaurant = {
      id: 4,
      label: "아시안",
      name: "쌀국수집",
      distance: 20,
      favorite: false,
    };
    expect(RestaurantListUtils.add(restaurantList, newRestaurant).length).toBe(
      5
    );
  });

  test("음식점 정보와 삭제할 id를 주면 해당 음식점이 삭제된 List를 반환한다.", () => {
    const resultList: Restaurant[] = [
      { id: 0, label: "한식", name: "한식집", distance: 10, favorite: false },
      { id: 1, label: "일식", name: "초밥집", distance: 5, favorite: false },
      { id: 3, label: "한식", name: "국밥집", distance: 20, favorite: false },
    ];
    expect(RestaurantListUtils.delete(restaurantList, 2)).toEqual(resultList);
  });

  test("음식점 카테고리를 주면 해당 카테고리의 음식점만 남겨진 List를 반환한다.", () => {
    expect(
      RestaurantListUtils.filterByCategory(restaurantList, "한식").length
    ).toBe(2);
  });

  test("음식점 정렬순서에 따라 정렬된 List를 반환한다.", () => {
    const restaurantListSortedById: Restaurant[] = [
      { id: 0, label: "한식", name: "한식집", distance: 10, favorite: false },
      { id: 1, label: "일식", name: "초밥집", distance: 5, favorite: false },
      { id: 2, label: "양식", name: "돈가스집", distance: 15, favorite: false },
      { id: 3, label: "한식", name: "국밥집", distance: 20, favorite: false },
    ];
    const restaurantListSortedByName: Restaurant[] = [
      { id: 3, label: "한식", name: "국밥집", distance: 20, favorite: false },
      { id: 2, label: "양식", name: "돈가스집", distance: 15, favorite: false },
      { id: 1, label: "일식", name: "초밥집", distance: 5, favorite: false },
      { id: 0, label: "한식", name: "한식집", distance: 10, favorite: false },
    ];
    const restaurantListSortedByDistance: Restaurant[] = [
      { id: 1, label: "일식", name: "초밥집", distance: 5, favorite: false },
      { id: 0, label: "한식", name: "한식집", distance: 10, favorite: false },
      { id: 2, label: "양식", name: "돈가스집", distance: 15, favorite: false },
      { id: 3, label: "한식", name: "국밥집", distance: 20, favorite: false },
    ];

    expect(RestaurantListUtils.sortById(restaurantList)).toEqual(
      restaurantListSortedById
    );
    expect(RestaurantListUtils.sortByName(restaurantList)).toEqual(
      restaurantListSortedByName
    );
    expect(RestaurantListUtils.sortByDistance(restaurantList)).toEqual(
      restaurantListSortedByDistance
    );
  });

  test("음식점 목록과 id를 주면 해당하는 음식점의 favorite 값이 변경된다", () => {
    const resultList: Restaurant[] = [
      { id: 0, label: "한식", name: "한식집", distance: 10, favorite: false },
      { id: 1, label: "일식", name: "초밥집", distance: 5, favorite: false },
      { id: 2, label: "양식", name: "돈가스집", distance: 15, favorite: true },
      { id: 3, label: "한식", name: "국밥집", distance: 20, favorite: false },
    ];

    expect(RestaurantListUtils.favoriteById(restaurantList, 2)).toEqual(
      resultList
    );
  });

  test("주어진 데이터 중 즐겨찾기된 음식점 목록을 반환할 수 있다.", () => {
    const resultList: Restaurant[] = [
      { id: 2, label: "양식", name: "돈가스집", distance: 15, favorite: true },
    ];
    const favoriteList = RestaurantListUtils.favoriteById(restaurantList, 2);
    expect(RestaurantListUtils.getFavoriteList(favoriteList)).toEqual(
      resultList
    );
  });
});
