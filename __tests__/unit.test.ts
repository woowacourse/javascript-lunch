import Restaurant from "../src/domain/Restaurant";
import RestaurantList from "../src/domain/RestaurantList";

describe("Restaurant 클래스 테스트", () => {
  test("Restaurant 객체를 생성하면 해당 정보를 저장한다.", () => {
    //given
    const data = {
      name: "레스토랑",
      category: "중식",
      distance: 5,
      description: "맛있는 식당입니다",
      url: "naver.com",
    };

    //when
    const restaurant = new Restaurant(Object.assign(data));
    const restaurantInfo = restaurant.getInfo();

    //then
    expect(restaurantInfo).toEqual(data);
  });
});

describe("RestaurantList 클래스 테스트", () => {
  test("음식점들을 이름순으로 정렬해서 가져온다.", () => {
    //given
    const restaurantList = new RestaurantList();

    //when
    restaurantList.addRestaurant({
      name: "나식당",
      category: "한식",
      distance: 5,
    });
    restaurantList.addRestaurant({
      name: "가식당",
      category: "중식",
      distance: 10,
    });
    restaurantList.addRestaurant({
      name: "다식당",
      category: "일식",
      distance: 15,
    });

    restaurantList.sortListByName();
    const sortedListByName = restaurantList.getRestaurantList();

    //then
    expect(
      sortedListByName.map((restaurant) => restaurant.getInfo().name)
    ).toEqual(["가식당", "나식당", "다식당"]);
  });

  test("음식점들을 거리순으로 정렬해서 가져온다.", () => {
    //given
    const restaurantList = new RestaurantList();

    //when
    restaurantList.addRestaurant({
      name: "나식당",
      category: "한식",
      distance: 10,
    });
    restaurantList.addRestaurant({
      name: "가식당",
      category: "중식",
      distance: 20,
    });
    restaurantList.addRestaurant({
      name: "다식당",
      category: "일식",
      distance: 15,
    });
    restaurantList.addRestaurant({
      name: "라식당",
      category: "한식",
      distance: 5,
    });

    restaurantList.sortListByDistance();
    const sortedListByDistance = restaurantList.getRestaurantList();

    //then
    expect(
      sortedListByDistance.map((restaurant) => restaurant.getInfo().name)
    ).toEqual(["라식당", "나식당", "다식당", "가식당"]);
  });

  test("음식점들을 카테고리별로 필터링해서 가져온다.", () => {
    //given
    const restaurantList = new RestaurantList();

    //when
    restaurantList.addRestaurant({
      name: "가식당",
      category: "일식",
      distance: 10,
    });
    restaurantList.addRestaurant({
      name: "나식당",
      category: "중식",
      distance: 20,
    });
    restaurantList.addRestaurant({
      name: "다식당",
      category: "일식",
      distance: 15,
    });
    restaurantList.addRestaurant({
      name: "라식당",
      category: "한식",
      distance: 5,
    });

    const filteredListByKorean =
      restaurantList.getFilteredListByCategory("한식");
    const filteredListByJapanese =
      restaurantList.getFilteredListByCategory("일식");

    //then
    expect(
      filteredListByKorean.map((restaurant) => restaurant.getInfo().name)
    ).toEqual(["라식당"]);
    expect(
      filteredListByJapanese.map((restaurant) => restaurant.getInfo().name)
    ).toEqual(["가식당", "다식당"]);
  });
});
