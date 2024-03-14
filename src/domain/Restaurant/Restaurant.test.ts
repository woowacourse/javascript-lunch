import type { CustomStorage } from "../../storages/type";

import Restaurant from "./Restaurant";
import type { RestaurantDetail } from "./Restaurant.type";

import RestaurantDetailValidator from "../../validator/restaurantDetail/RestaurantDetailValidator";

import { MENU_CATEGORIES } from "../../constants/menuCategory/menuCategory";
import { SORT_CATEGORIES_TYPE } from "../../constants/sortCategory/sortCategory";

// given
class FakeRestaurantStorage
  implements CustomStorage<RestaurantDetail[], RestaurantDetail>
{
  private restaurants: RestaurantDetail[] = [
    {
      category: "한식",
      name: "한식당1",
      distance: "10",
      description: "맛있는 한식당",
      url: "http://example.com/1",
      isFavorite: false,
    },
    {
      category: "한식",
      name: "한식당2",
      distance: "5",
      description: "저렴한 한식당",
      url: "http://example.com/2",
      isFavorite: false,
    },
    {
      category: "중식",
      name: "중식당1",
      distance: "15",
      description: "중국집",
      url: "http://example.com/3",
      isFavorite: false,
    },
    {
      category: "중식",
      name: "중식당2",
      distance: "10",
      description: "중국집2",
      url: "http://example.com/44",
      isFavorite: false,
    },
    {
      category: "일식",
      name: "일식당1",
      distance: "20",
      description: "일본 음식",
      url: "http://example.com/4",
      isFavorite: false,
    },
    {
      category: "양식",
      name: "양식당1",
      distance: "30",
      description: "서양 음식",
      url: "http://example.com/5",
      isFavorite: false,
    },
    {
      category: "아시안",
      name: "아시안 음식당1",
      distance: "20",
      description: "다양한 아시아 음식",
      url: "http://example.com/6",
      isFavorite: false,
    },
    {
      category: "기타",
      name: "세계 음식당1",
      distance: "15",
      description: "세계 각국의 음식을 제공",
      url: "http://example.com/7",
      isFavorite: false,
    },
  ];

  get() {
    return this.restaurants;
  }

  set(newRestaurantDetail: RestaurantDetail) {
    this.restaurants.push(newRestaurantDetail);
  }

  remove() {}

  update() {}
}

describe("Restaurant 모듈 테스트", () => {
  // given
  let restaurant: Restaurant;

  const isSortedBy = <K extends keyof RestaurantDetail>(
    key: K,
    comparator: (a: RestaurantDetail[K], b: RestaurantDetail[K]) => boolean
  ): boolean =>
    restaurant
      .getRestaurantDetails()
      .every(
        (restaurantDetail, index, restaurantDetails) =>
          index === 0 ||
          comparator(restaurantDetail[key], restaurantDetails[index - 1][key])
      );

  beforeEach(() => {
    restaurant = new Restaurant(new FakeRestaurantStorage());
  });

  describe("음식점 추가 기능", () => {
    test("새로운 음식점은 storage 내 추가 된다.", () => {
      // given
      const newRestaurantDetail: RestaurantDetail = {
        category: "양식",
        name: "양식당2",
        distance: "30",
        description: "모던 유럽 요리",
        url: "http://example.com/6",
        isFavorite: false,
      };

      // when
      restaurant.addRestaurant(newRestaurantDetail);

      // then
      expect(restaurant.getRestaurantDetails()).toContainEqual(
        newRestaurantDetail
      );
    });
  });

  describe("중복 된 음식점 추가 검증 기능", () => {
    // given
    const newRestaurantDetail: RestaurantDetail = {
      category: "한식",
      name: "한식당1", // 이미 존재하는 이름
      distance: "15",
      description: "새로운 한식당",
      url: "http://example.com/new",
      isFavorite: false,
    };
    test(`중복된 음식점 이름이 존재 할 경우 "${RestaurantDetailValidator.validationTypes.duplicateNames.errorMessage}" 메시지와 함께 에러를 발생시킨다`, () => {
      // when - then
      expect(() => {
        restaurant.validateRestaurantDetail(newRestaurantDetail);
      }).toThrow(
        RestaurantDetailValidator.validationTypes.duplicateNames.errorMessage
      );
    });

    test("중복된 음식점 이름이 없다면 에러를 발생시키지 않는다", () => {
      // given
      newRestaurantDetail.name = "지니 식당";

      // when - then
      expect(() => {
        restaurant.validateRestaurantDetail(newRestaurantDetail);
      }).not.toThrow(
        RestaurantDetailValidator.validationTypes.duplicateNames.errorMessage
      );
    });
  });

  describe("음식점 정렬 기능", () => {
    test("이름 순으로 정렬된다.", () => {
      // when
      restaurant.sortRestaurants(SORT_CATEGORIES_TYPE.name);

      // then
      expect(
        isSortedBy("name", (a, b) => a.localeCompare(b) >= 0)
      ).toBeTruthy();
    });

    test("거리 순으로 정렬된다.", () => {
      // when
      restaurant.sortRestaurants(SORT_CATEGORIES_TYPE.distance);

      // then
      expect(
        isSortedBy("distance", (a, b) => Number(a) >= Number(b))
      ).toBeTruthy();
    });
  });

  describe("음식점 필터 기능", () => {
    // given
    const TEST_CASES = [
      { targetCategory: "한식" },
      { targetCategory: "중식" },
      { targetCategory: "일식" },
      { targetCategory: "양식" },
      { targetCategory: "아시안" },
      { targetCategory: "기타" },
    ] as const;
    test.each(TEST_CASES)(
      "$targetCategory 카테고리로 필터링되어야 한다",
      ({ targetCategory }) => {
        // when
        restaurant.filterRestaurants(targetCategory, SORT_CATEGORIES_TYPE.name);

        // then
        const isFilteredRestaurants = restaurant
          .getRestaurantDetails()
          .every(({ category }) => category === targetCategory);
        expect(isFilteredRestaurants).toBeTruthy();
      }
    );

    test("전체 카테고리를 누를 경우 필터링 전 데이터와 동일하다.", () => {
      // given
      const initialRestaurantDetails = new FakeRestaurantStorage().get();

      // when
      restaurant.filterRestaurants(MENU_CATEGORIES.all);

      // then
      const restaurantsDetails = restaurant.getRestaurantDetails();

      initialRestaurantDetails.forEach((restaurantDetail) => {
        expect(restaurantsDetails).toContainEqual(restaurantDetail);
      });
      expect(restaurantsDetails.length).toBe(initialRestaurantDetails.length);
    });
  });

  describe("기능 복합 검증", () => {
    test("'중식' 카테고리로 필터링한 상황에서 '한식' 카테고리의 새로운 음식점을 추가한 경우 해당 음식점은 포함되지 않는다.", () => {
      // given
      const newRestaurantDetail: RestaurantDetail = {
        category: "한식",
        name: "한식당3",
        distance: "30",
        description: "신규 한식당",
        url: "http://example.com/new",
        isFavorite: false,
      };

      // when
      restaurant.filterRestaurants("중식");
      restaurant.addRestaurant(newRestaurantDetail);

      // then
      const restaurantDetails = restaurant.getRestaurantDetails();
      expect(restaurantDetails).not.toContainEqual(newRestaurantDetail);
    });

    test("'양식' 카테고리로 필터링 한 상황에서 동일한 카테고리의 새로운 음식점을 추가한 경우 그 음식점은 포함된다.", () => {
      // given
      const newRestaurantDetail: RestaurantDetail = {
        category: "양식",
        name: "양식당123",
        distance: "30",
        description: "신규 양식당",
        url: "http://example.com/new",
        isFavorite: false,
      };

      // when
      restaurant.filterRestaurants("양식");
      restaurant.addRestaurant(newRestaurantDetail);

      // then
      const restaurantDetails = restaurant.getRestaurantDetails();
      expect(restaurantDetails).toContainEqual(newRestaurantDetail);
    });

    test("'중식' 카테고리로 필터링 된 상태에서 '거리순'으로 정렬 시 중식 카테고리 내 데이터 들이 거리 순으로 정렬 된다.", () => {
      // when
      restaurant.filterRestaurants("중식");
      restaurant.sortRestaurants(SORT_CATEGORIES_TYPE.distance);

      // then
      const isSortedByDistance = isSortedBy(
        "distance",
        (a, b) => Number(a) >= Number(b)
      );
      const isFilteredRestaurants = restaurant
        .getRestaurantDetails()
        .every(({ category }) => category === "중식");

      expect(isFilteredRestaurants && isSortedByDistance).toBeTruthy();
    });

    test("'중식' 카테고리로 필터링 된 상태에서 '이름순'으로 정렬 시 중식 카테고리 내 데이터 들이 이름 순으로 정렬 된다.", () => {
      // when
      restaurant.filterRestaurants("중식");
      restaurant.sortRestaurants(SORT_CATEGORIES_TYPE.name);

      // then
      const isSortedByName = isSortedBy(
        "name",
        (a, b) => a.localeCompare(b) >= 0
      );
      const isFilteredRestaurants = restaurant
        .getRestaurantDetails()
        .every(({ category }) => category === "중식");

      expect(isFilteredRestaurants && isSortedByName).toBeTruthy();
    });

    test("'중식'에서 '전체'로 카테고리를 변경 해도 정렬 형태는 동일하다.", () => {
      // when
      restaurant.filterRestaurants("중식", SORT_CATEGORIES_TYPE.distance);
      restaurant.filterRestaurants(
        MENU_CATEGORIES.all,
        SORT_CATEGORIES_TYPE.distance
      );

      // then
      expect(
        isSortedBy("distance", (a, b) => Number(a) >= Number(b))
      ).toBeTruthy();
    });
  });
});
