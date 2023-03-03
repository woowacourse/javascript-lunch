import RestaurantRepository from "../src/domain/RestaurantRepository";

describe("음식점 저장소 클래스 테스트", () => {
  test("RestaurantRepository 객체 생성 테스트", () => {
    const restaurants = [
      {
        name: "라식당",
        category: "한식",
        distance: 5,
        description: "라식당입니다.",
      },
      {
        name: "다식당",
        category: "일식",
        distance: 10,
        description: "다식당입니다.",
      },
      {
        name: "나식당",
        category: "아시안",
        distance: 20,
        description: "나식당입니다.",
      },
      {
        name: "가식당",
        category: "아시안",
        distance: 20,
        description: "가식당입니다.",
      },
    ];
    const restaurantRepository = new RestaurantRepository(
      Object.assign(restaurants)
    );

    const result = restaurantRepository.getRestaurantList();

    expect(result).toEqual(restaurants);
  });

  test("음식점 추가 기능 테스트", () => {
    const restaurantRepository = new RestaurantRepository([]);

    restaurantRepository.addRestaurant({
      name: "가식당",
      category: "아시안",
      distance: 20,
      description: "가식당입니다.",
    });
    restaurantRepository.addRestaurant({
      name: "나식당",
      category: "한식",
      distance: 10,
      description: "나식당입니다.",
    });

    const result = restaurantRepository.getRestaurantList();

    expect(result).toEqual([
      {
        name: "가식당",
        category: "아시안",
        distance: 20,
        description: "가식당입니다.",
      },
      {
        name: "나식당",
        category: "한식",
        distance: 10,
        description: "나식당입니다.",
      },
    ]);
  });
});
