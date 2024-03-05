import { Category, Distance, Restaurant } from "../src/types";
import RestaurantList from "../src/domain/RestaurantList";

describe("음식점 목록 클래스 테스트", () => {
  const restaurants: Restaurant[] = [
    {
      category: "한식",
      name: "우리김밥",
      distance: 5,
    },
    {
      category: "일식",
      name: "너네초밥",
      distance: 30,
    },
    {
      category: "중식",
      name: "친친",
      distance: 20,
    },
    {
      category: "아시안",
      name: "김밥천국",
      distance: 15,
    },
  ];

  test("음식점 목록을 반환한다", () => {
    // Given
    const answer: Restaurant[] = [
      {
        category: "한식",
        name: "우리김밥",
        distance: 5,
      },
      {
        category: "일식",
        name: "너네초밥",
        distance: 30,
      },
      {
        category: "중식",
        name: "친친",
        distance: 20,
      },
      {
        category: "아시안",
        name: "김밥천국",
        distance: 15,
      },
    ];

    // When
    const restaurantList = new RestaurantList(restaurants);

    // Then
    expect(restaurantList.getRestaurants()).not.toBe(answer);
    expect(restaurantList.getRestaurants()).toEqual(answer);
  });

  test("카테고리별로 필터링해서 반환한다", () => {
    // Given
    const answer: Restaurant[] = [
      {
        category: "한식",
        name: "우리김밥",
        distance: 5,
      },
    ];

    // When
    const restaurantList = new RestaurantList(restaurants);

    // Then
    expect(restaurantList.getFilteredRestaurants("한식")).not.toBe(answer);
    expect(restaurantList.getFilteredRestaurants("한식")).toEqual(answer);
  });

  test("이름순으로 정렬해서 반환한다", () => {
    // Given
    const answer: Restaurant[] = [
      {
        category: "아시안",
        name: "김밥천국",
        distance: 15,
      },
      {
        category: "일식",
        name: "너네초밥",
        distance: 30,
      },
      {
        category: "한식",
        name: "우리김밥",
        distance: 5,
      },
      {
        category: "중식",
        name: "친친",
        distance: 20,
      },
    ];

    // When
    const restaurantList = new RestaurantList(restaurants);

    // Then
    expect(restaurantList.getSortedRestaurants("name")).not.toBe(answer);
    expect(restaurantList.getSortedRestaurants("name")).toEqual(answer);
  });

  test("거리순으로 정렬해서 반환한다", () => {
    // Given
    const answer: Restaurant[] = [
      {
        category: "한식",
        name: "우리김밥",
        distance: 5,
      },
      {
        category: "아시안",
        name: "김밥천국",
        distance: 15,
      },
      {
        category: "중식",
        name: "친친",
        distance: 20,
      },
      {
        category: "일식",
        name: "너네초밥",
        distance: 30,
      },
    ];

    // When
    const restaurantList = new RestaurantList(restaurants);

    // Then
    const expected = expect(restaurantList.getSortedRestaurants("distance"));
    expected.not.toBe(answer);
    expected.toEqual(answer);
  });
});
