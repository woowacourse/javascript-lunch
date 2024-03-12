import { Category, Restaurant, SortingStandard } from "../src/types";
import RestaurantList from "../src/domain/RestaurantList";

describe("음식점 목록 클래스 테스트", () => {
  let restaurantList;

  beforeEach(() => {
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
        description: "정말 맛있는 너네집 초밥!",
      },
      {
        category: "중식",
        name: "친친",
        distance: 10,
        link: "https://map.naver.com",
      },
      {
        category: "아시안",
        name: "김밥천국",
        distance: 15,
        description: "원조 김밥 맛집!",
        link: "http://map.naver.com",
      },
      {
        category: "한식",
        name: "비벼비벼비빔밥",
        distance: 20,
      },
    ];
    restaurantList = new RestaurantList(restaurants);
  });

  test.each([
    {
      category: "전체" as Category,
      sortingStandard: "distance" as SortingStandard,
      expectedResult: [
        {
          category: "한식",
          name: "우리김밥",
          distance: 5,
        },
        {
          category: "중식",
          name: "친친",
          distance: 10,
          link: "https://map.naver.com",
        },
        {
          category: "아시안",
          name: "김밥천국",
          distance: 15,
          description: "원조 김밥 맛집!",
          link: "http://map.naver.com",
        },
        {
          category: "한식",
          name: "비벼비벼비빔밥",
          distance: 20,
        },
        {
          category: "일식",
          name: "너네초밥",
          distance: 30,
          description: "정말 맛있는 너네집 초밥!",
        },
      ] as Restaurant[],
    },
    {
      category: "한식" as Category,
      sortingStandard: "name" as SortingStandard,
      expectedResult: [
        {
          category: "한식",
          name: "비벼비벼비빔밥",
          distance: 20,
        },
        {
          category: "한식",
          name: "우리김밥",
          distance: 5,
        },
      ] as Restaurant[],
    },
  ])(
    "카테고리와 정렬 기준을 인자로 주면, 필터링과 정렬을 거쳐 음식점 목록을 반환한다",
    // Given
    ({
      category,
      sortingStandard,
      expectedResult,
    }: {
      category: Category;
      sortingStandard: SortingStandard;
      expectedResult: Restaurant[];
    }) => {
      // When
      const restaurants = restaurantList.getRestaurants({
        category,
        sortingStandard,
      });

      // Then
      expect(restaurants).toEqual(expectedResult);
    }
  );

  test("음식점 목록에 새로운 음식점을 추가할 수 있다", () => {
    // Given
    const restaurant = {
      category: "일식",
      name: "초밥초밥",
      distance: 20,
    };
    const category = "전체";
    const sortingStandard = "name";
    const expectedResult: Restaurant[] = [
      {
        category: "아시안",
        name: "김밥천국",
        distance: 15,
        description: "원조 김밥 맛집!",
        link: "http://map.naver.com",
      },
      {
        category: "일식",
        name: "너네초밥",
        distance: 30,
        description: "정말 맛있는 너네집 초밥!",
      },
      {
        category: "한식",
        name: "비벼비벼비빔밥",
        distance: 20,
      },
      {
        category: "한식",
        name: "우리김밥",
        distance: 5,
      },
      {
        category: "일식",
        name: "초밥초밥",
        distance: 20,
      },
      {
        category: "중식",
        name: "친친",
        distance: 10,
        link: "https://map.naver.com",
      },
    ];

    // When
    restaurantList.add(restaurant);
    const restaurants = restaurantList.getRestaurants({
      category,
      sortingStandard,
    });

    // Then
    expect(restaurants).toEqual(expectedResult);
  });
});
