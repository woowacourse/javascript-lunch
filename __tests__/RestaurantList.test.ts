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

  test("음식점 목록이 주어지고 입력받은 목록을 그대로 출력한다", () => {
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
    expect(restaurantList.getRestaurants()).toEqual(answer);
  });

  test("음식점이 주어지고 필터링 조건이 추가되면 해당 필터에 맞는 음식점을 반환", () => {
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
    expect(restaurantList.getFilteredRestaurants("한식")).toEqual(answer);
  });

  test("주어진 음식점 목록을 이름 기준으로 정렬 후 반환", () => {
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
    expect(restaurantList.getSortedRestaurants("name")).toEqual(answer);
  });

  test("주어진 음식점 목록을 거리 기준으로 정렬 후 반환", () => {
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
    expect(restaurantList.getSortedRestaurants("distance")).toEqual(answer);
  });

  test("기존 음식점이 주어진 상태에서 새 음식점을 추가하면 해당 음식점을 포함한 새 음식점 목록을 반환", () => {
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
      {
        category: "일식",
        name: "초밥초밥",
        distance: 20,
      },
    ];

    // When
    const restaurantList = new RestaurantList(restaurants);
    restaurantList.add({
      category: "일식",
      name: "초밥초밥",
      distance: 20,
    });

    // Then
    expect(restaurantList.getRestaurants()).toEqual(answer);
  });
});
