import { Restaurant, Category } from '../../src/domain/interface/Restaurant';
import {
  RestaurantManager,
  RestaurantManager,
} from '../../src/domain/RestaurantManager';

describe('음식점 목록 테스트', () => {
  it('음식점을 추가하면 정상적으로 추가되었는지 확인한다.', () => {
    // given
    const newRestaurant: Restaurant = {
      id: 1,
      category: '중식',
      name: '친친',
      walkingTime: 5,
    };

    const restaurantManager: RestaurantManager = new RestaurantManager([]);

    // when
    restaurantManager.add(newRestaurant);

    // then
    expect(restaurantManager.getRestaurantList()).to.eql([newRestaurant]);
  });

  it('음식점을 이름순으로 정렬해 반환한다.', () => {
    // given
    const localStorageRestaurants: Restaurant[] = [
      {
        id: 1,
        category: '한식',
        name: '바',
        walkingTime: 5,
      },
      {
        id: 2,
        category: '한식',
        name: '가',
        walkingTime: 5,
      },
      {
        id: 3,
        category: '한식',
        name: '나',
        walkingTime: 5,
      },
      {
        id: 4,
        category: '한식',
        name: '마녀김밥',
        walkingTime: 5,
      },
    ];
    const restaurantManager: RestaurantManager = new RestaurantManager(
      localStorageRestaurants
    );
    const sortedByAscendingName: Restaurant[] = [
      {
        id: 2,
        category: '한식',
        name: '가',
        walkingTime: 5,
      },
      {
        id: 3,
        category: '한식',
        name: '나',
        walkingTime: 5,
      },
      {
        id: 4,
        category: '한식',
        name: '마녀김밥',
        walkingTime: 5,
      },
      {
        id: 1,
        category: '한식',
        name: '바',
        walkingTime: 5,
      },
    ];

    // then
    expect(restaurantManager.sortByAscendingNameAndCategory()).to.eql(
      sortedByAscendingName
    );
  });

  it('음식점을 거리순으로 정렬해 반환한다.', () => {
    // given
    const localStorageRestaurants: Restaurant[] = [
      {
        id: 1,
        category: '한식',
        name: '바',
        walkingTime: 30,
      },
      {
        id: 2,
        category: '한식',
        name: '간',
        walkingTime: 5,
      },
      {
        id: 3,
        category: '한식',
        name: '가',
        walkingTime: 5,
      },
      {
        id: 4,
        category: '한식',
        name: '나',
        walkingTime: 20,
      },
      {
        id: 5,
        category: '한식',
        name: '마녀김밥',
        walkingTime: 10,
      },
    ];
    const restaurantManager: RestaurantManager = new RestaurantManager(
      localStorageRestaurants
    );
    const sortedByAscendingWalkingTime: Restaurant[] = [
      {
        id: 3,
        category: '한식',
        name: '가',
        walkingTime: 5,
      },
      {
        id: 2,
        category: '한식',
        name: '간',
        walkingTime: 5,
      },
      {
        id: 5,
        category: '한식',
        name: '마녀김밥',
        walkingTime: 10,
      },
      {
        id: 4,
        category: '한식',
        name: '나',
        walkingTime: 20,
      },
      {
        id: 1,
        category: '한식',
        name: '바',
        walkingTime: 30,
      },
    ];

    // then
    expect(restaurantManager.sortByAscendingWalkingTimeAndCategory()).to.eql(
      sortedByAscendingWalkingTime
    );
  });

  it('입력받은 카테고리로 필터링된 메뉴 목록 반환한다.', () => {
    // given
    const newRestaurant: Restaurant = {
      category: '중식',
      name: '친친',
      walkingTime: 5,
    };

    const restaurantManager: RestaurantManager = new RestaurantManager([]);

    // when
    restaurantManager.add(newRestaurant);

    // then
    expect(restaurantManager.getRestaurantList()).to.eql([newRestaurant]);
  });

  const totalRestaurants: Restaurant[] = [
    {
      id: 1,
      category: '중식',
      name: '가',
      walkingTime: 5,
    },
    {
      id: 2,
      category: '한식',
      name: '마녀김밥',
      walkingTime: 10,
    },
    {
      id: 3,
      category: '한식',
      name: '나',
      walkingTime: 20,
    },
    {
      id: 4,
      category: '일식',
      name: '바',
      walkingTime: 30,
    },
  ];

  const testData: { category: Category; filteredRestaurants: Restaurant[] }[] =
    [
      {
        category: '중식',
        filteredRestaurants: [
          {
            id: 1,
            category: '중식',
            name: '가',
            walkingTime: 5,
          },
        ],
      },
      {
        category: '일식',
        filteredRestaurants: [
          {
            id: 4,
            category: '일식',
            name: '바',
            walkingTime: 30,
          },
        ],
      },
      {
        category: '한식',
        filteredRestaurants: [
          {
            id: 2,
            category: '한식',
            name: '마녀김밥',
            walkingTime: 10,
          },
          {
            id: 3,
            category: '한식',
            name: '나',
            walkingTime: 20,
          },
        ],
      },
    ];

  testData.forEach(({ category, filteredRestaurants }) => {
    it(`${category}(으)로 정렬한 결과를 받아온다.`, () => {
      // given
      const restaurantManager: RestaurantManager = new RestaurantManager(
        totalRestaurants
      );

      restaurantManager.setCurrentCategory(category);
      // then
      expect(restaurantManager.filteredRestaurantList()).to.eql(
        filteredRestaurants
      );
    });
  });
});
