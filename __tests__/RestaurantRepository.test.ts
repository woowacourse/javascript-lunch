import RestaurantListManager from "../src/domain/RestaurantListManager";

const restaurants = [
  {
    id: 1,
    name: "라식당",
    category: "한식",
    distance: 5,
    description: "라식당입니다.",
    favorite: false,
  },
  {
    id: 2,
    name: "다식당",
    category: "일식",
    distance: 10,
    description: "다식당입니다.",
    favorite: true,
  },
  {
    id: 3,
    name: "나식당",
    category: "아시안",
    distance: 20,
    description: "나식당입니다.",
    favorite: false,
  },
  {
    id: 4,
    name: "가식당",
    category: "아시안",
    distance: 20,
    description: "가식당입니다.",
    favorite: true,
  },
];

describe("음식점 리스트 관리 클래스 테스트", () => {
  test("getter에 인자를 넣지 않고 사용하면, 자동으로 '전체' 카테고리 및 '이름순'으로 정렬해서 데이터를 가져온다.", () => {
    const restaurantListManager = new RestaurantListManager(Object.assign(restaurants));

    const result = restaurantListManager.getRestaurantList();

    expect(result).toEqual([
      {
        id: 4,
        name: "가식당",
        category: "아시안",
        distance: 20,
        description: "가식당입니다.",
        favorite: true,
      },
      {
        id: 3,
        name: "나식당",
        category: "아시안",
        distance: 20,
        description: "나식당입니다.",
        favorite: false,
      },
      {
        id: 2,
        name: "다식당",
        category: "일식",
        distance: 10,
        description: "다식당입니다.",
        favorite: true,
      },
      {
        id: 1,
        name: "라식당",
        category: "한식",
        distance: 5,
        description: "라식당입니다.",
        favorite: false,
      },
    ]);
  });

  test("음식점 2개 추가 후 음식점 결과 반환", () => {
    const restaurantListManager = new RestaurantListManager([]);

    restaurantListManager.addRestaurant({
      id: 1,
      name: "가식당",
      category: "아시안",
      distance: 20,
      description: "가식당입니다.",
      favorite: false,
    });

    restaurantListManager.addRestaurant({
      id: 2,
      name: "나식당",
      category: "한식",
      distance: 10,
      description: "나식당입니다.",
      favorite: false,
    });

    const result = restaurantListManager.getRestaurantList();

    expect(result).toEqual([
      {
        id: 1,
        name: "가식당",
        category: "아시안",
        distance: 20,
        description: "가식당입니다.",
        favorite: false,
      },
      {
        id: 2,
        name: "나식당",
        category: "한식",
        distance: 10,
        description: "나식당입니다.",
        favorite: false,
      },
    ]);
  });

  test("음식점 리스트에서 한식으로 필터링 하면 한식 음식점만 남고, 아시안으로 필터링 하면 아시안 음식점만 남는다.", () => {
    const restaurantListManager = new RestaurantListManager(Object.assign(restaurants));

    const koreanRestaurantList = restaurantListManager.getRestaurantList("한식");
    const asianRestaurantList = restaurantListManager.getRestaurantList("아시안");

    expect(koreanRestaurantList).toEqual([
      {
        id: 1,
        name: "라식당",
        category: "한식",
        distance: 5,
        description: "라식당입니다.",
        favorite: false,
      },
    ]);

    expect(asianRestaurantList).toEqual([
      {
        id: 4,
        name: "가식당",
        category: "아시안",
        distance: 20,
        description: "가식당입니다.",
        favorite: true,
      },
      {
        id: 3,
        name: "나식당",
        category: "아시안",
        distance: 20,
        description: "나식당입니다.",
        favorite: false,
      },
    ]);
  });

  test("음식점 리스트를 이름순으로 정렬 시 가식당, 나식당, 다식당, 라식당 순으로 정렬된다. / 거리순으로 정렬시 distance가 작은 순으로 정렬된다. ", () => {
    const restaurantListManager = new RestaurantListManager(Object.assign(restaurants));

    const sortedByName = restaurantListManager.getRestaurantList("전체", "이름순");
    const sortedByDistance = restaurantListManager.getRestaurantList("전체", "거리순");

    expect(sortedByName).toEqual([
      {
        id: 4,
        name: "가식당",
        category: "아시안",
        distance: 20,
        description: "가식당입니다.",
        favorite: true,
      },
      {
        id: 3,
        name: "나식당",
        category: "아시안",
        distance: 20,
        description: "나식당입니다.",
        favorite: false,
      },
      {
        id: 2,
        name: "다식당",
        category: "일식",
        distance: 10,
        description: "다식당입니다.",
        favorite: true,
      },
      {
        id: 1,
        name: "라식당",
        category: "한식",
        distance: 5,
        description: "라식당입니다.",
        favorite: false,
      },
    ]);

    expect(sortedByDistance).toEqual([
      {
        id: 1,
        name: "라식당",
        category: "한식",
        distance: 5,
        description: "라식당입니다.",
        favorite: false,
      },
      {
        id: 2,
        name: "다식당",
        category: "일식",
        distance: 10,
        description: "다식당입니다.",
        favorite: true,
      },
      {
        id: 3,
        name: "나식당",
        category: "아시안",
        distance: 20,
        description: "나식당입니다.",
        favorite: false,
      },
      {
        id: 4,
        name: "가식당",
        category: "아시안",
        distance: 20,
        description: "가식당입니다.",
        favorite: true,
      },
    ]);
  });

  test("음식점 리스트에서 즐겨찾기 한 음식점만 가져온다.", () => {
    const restaurantListManager = new RestaurantListManager(Object.assign(restaurants));

    const favoriteList = restaurantListManager.getFavoriteList();

    expect(favoriteList).toEqual([
      {
        id: 2,
        name: "다식당",
        category: "일식",
        distance: 10,
        description: "다식당입니다.",
        favorite: true,
      },
      {
        id: 4,
        name: "가식당",
        category: "아시안",
        distance: 20,
        description: "가식당입니다.",
        favorite: true,
      },
    ]);
  });
});
