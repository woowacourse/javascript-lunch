import { Category, Distance, Restaurant } from "../src/types";
import RestaurantList from "../src/domain/RestaurantList";

describe("음식점 목록 테스트", () => {
  test("목록이 알맞게 출력되었는지", () => {
    // Given
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
    ];
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
    ];

    // When
    const restaurantList = new RestaurantList(restaurants);

    // Then
    expect(restaurantList.getRestaurants).toEqual(answer);
  });
});
