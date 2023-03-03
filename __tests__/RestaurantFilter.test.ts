import RestaurantFilter from "../src/domain/RestaurantFilter";

describe("레스토랑필터 클래스 테스트", () => {
  test("이름순으로 정렬하는 기능에 대한 테스트", () => {
    //given
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

    //when
    const sortedList = RestaurantFilter.sortRestaurants(
      "name",
      Object.assign(restaurants)
    );
    const nameList = sortedList.map((restaurant) => restaurant.name);

    //then
    expect(nameList).toEqual(["가식당", "나식당", "다식당", "라식당"]);
  });

  test("거리순으로 정렬하는 기능에 대한 테스트", () => {
    //given
    const restaurants = [
      {
        name: "가식당",
        category: "한식",
        distance: 20,
        description: "가식당입니다.",
      },
      {
        name: "나식당",
        category: "일식",
        distance: 5,
        description: "나식당입니다.",
      },
      {
        name: "다식당",
        category: "아시안",
        distance: 10,
        description: "다식당입니다.",
      },
      {
        name: "라식당",
        category: "아시안",
        distance: 15,
        description: "라식당입니다.",
      },
    ];

    //when
    const sortedList = RestaurantFilter.sortRestaurants(
      "distance",
      Object.assign(restaurants)
    );
    const nameList = sortedList.map((restaurant) => restaurant.name);

    //then
    expect(nameList).toEqual(["나식당", "다식당", "라식당", "가식당"]);
  });

  test("한식 카테고리만 필터링하는 기능에 대한 테스트", () => {
    //given
    const restaurants = [
      {
        name: "가식당",
        category: "한식",
        distance: 20,
        description: "가식당입니다.",
      },
      {
        name: "나식당",
        category: "일식",
        distance: 5,
        description: "나식당입니다.",
      },
      {
        name: "다식당",
        category: "한식",
        distance: 10,
        description: "다식당입니다.",
      },
      {
        name: "라식당",
        category: "아시안",
        distance: 15,
        description: "라식당입니다.",
      },
    ];

    //when
    const sortedList = RestaurantFilter.categorizeRestaurants(
      "한식",
      Object.assign(restaurants)
    );
    const nameList = sortedList.map((restaurant) => restaurant.name);

    //then
    expect(nameList).toEqual(["가식당", "다식당"]);
  });

  test("일식 카테고리만 필터링하는 기능에 대한 테스트", () => {
    //given
    const restaurants = [
      {
        name: "가식당",
        category: "한식",
        distance: 20,
        description: "가식당입니다.",
      },
      {
        name: "나식당",
        category: "일식",
        distance: 5,
        description: "나식당입니다.",
      },
      {
        name: "다식당",
        category: "한식",
        distance: 10,
        description: "다식당입니다.",
      },
      {
        name: "라식당",
        category: "아시안",
        distance: 15,
        description: "라식당입니다.",
      },
    ];

    //when
    const sortedList = RestaurantFilter.categorizeRestaurants(
      "일식",
      Object.assign(restaurants)
    );
    const nameList = sortedList.map((restaurant) => restaurant.name);

    //then
    expect(nameList).toEqual(["나식당"]);
  });
});
