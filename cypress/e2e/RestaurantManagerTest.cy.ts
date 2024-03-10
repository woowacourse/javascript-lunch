import {
  Restaurant,
  Category,
  WalkingTime,
} from '../../src/interface/Restaurant';
import { RestaurantManager } from '../../src/domain/RestaurantManager';

describe('음식점 목록 테스트', () => {
  const TestData = {
    addition: {
      input: {
        category: '중식' as Category,
        name: '친친',
        walkingTime: 5 as WalkingTime,
      },
      output: {
        category: '중식' as Category,
        name: '친친',
        walkingTime: 5 as WalkingTime,
      },
    },

    sortingName: {
      input: [
        {
          category: '한식' as Category,
          name: '바',
          walkingTime: 5 as WalkingTime,
        },
        {
          category: '한식' as Category,
          name: '가',
          walkingTime: 5 as WalkingTime,
        },
        {
          category: '한식' as Category,
          name: '나',
          walkingTime: 5 as WalkingTime,
        },
        {
          category: '한식' as Category,
          name: '마녀김밥',
          walkingTime: 5 as WalkingTime,
        },
      ],
      output: [
        {
          category: '한식' as Category,
          name: '가',
          walkingTime: 5 as WalkingTime,
        },
        {
          category: '한식' as Category,
          name: '나',
          walkingTime: 5 as WalkingTime,
        },
        {
          category: '한식' as Category,
          name: '마녀김밥',
          walkingTime: 5 as WalkingTime,
        },
        {
          category: '한식' as Category,
          name: '바',
          walkingTime: 5 as WalkingTime,
        },
      ],
    },
    sortingWalkingTime: {
      input: [
        {
          category: '한식' as Category,
          name: '바',
          walkingTime: 30 as WalkingTime,
        },
        {
          category: '한식' as Category,
          name: '간',
          walkingTime: 5 as WalkingTime,
        },
        {
          category: '한식' as Category,
          name: '가',
          walkingTime: 5 as WalkingTime,
        },
        {
          category: '한식' as Category,
          name: '나',
          walkingTime: 20 as WalkingTime,
        },
        {
          category: '한식' as Category,
          name: '마녀김밥',
          walkingTime: 10 as WalkingTime,
        },
      ],
      output: [
        {
          category: '한식' as Category,
          name: '가',
          walkingTime: 5 as WalkingTime,
        },
        {
          category: '한식' as Category,
          name: '간',
          walkingTime: 5 as WalkingTime,
        },
        {
          category: '한식' as Category,
          name: '마녀김밥',
          walkingTime: 10 as WalkingTime,
        },
        {
          category: '한식' as Category,
          name: '나',
          walkingTime: 20 as WalkingTime,
        },
        {
          category: '한식' as Category,
          name: '바',
          walkingTime: 30 as WalkingTime,
        },
      ],
    },

    filterTests: {
      input: [
        {
          category: '중식' as Category,
          filteredRestaurants: [
            {
              category: '중식' as Category,
              name: '가',
              walkingTime: 5 as WalkingTime,
            },
          ],
        },
        {
          category: '일식' as Category,
          filteredRestaurants: [
            {
              category: '일식' as Category,
              name: '바',
              walkingTime: 30 as WalkingTime,
            },
          ],
        },
        {
          category: '한식' as Category,
          filteredRestaurants: [
            {
              category: '한식' as Category,
              name: '마녀김밥',
              walkingTime: 10 as WalkingTime,
            },
            {
              category: '한식' as Category,
              name: '나',
              walkingTime: 20 as WalkingTime,
            },
          ],
        },
      ],
      output: [
        {
          category: '중식' as Category,
          name: '가',
          walkingTime: 5 as WalkingTime,
        },
        {
          category: '한식' as Category,
          name: '마녀김밥',
          walkingTime: 10 as WalkingTime,
        },
        {
          category: '한식' as Category,
          name: '나',
          walkingTime: 20 as WalkingTime,
        },
        {
          category: '일식' as Category,
          name: '바',
          walkingTime: 30 as WalkingTime,
        },
      ],
    },
  };

  it('음식점을 추가하면 정상적으로 추가되었는지 확인한다.', () => {
    // given
    const newRestaurant: Restaurant = TestData.addition.input;

    const restaurantManager = new RestaurantManager([]);

    // when
    restaurantManager.add(TestData.addition.output);

    // then
    expect(restaurantManager.getRestaurants()).to.eql([newRestaurant]);
  });

  it('음식점을 이름순으로 정렬해 반환한다.', () => {
    // given
    const localStorageRestaurants: Restaurant[] = TestData.sortingName.input;
    const restaurantManager: RestaurantManager = new RestaurantManager(
      localStorageRestaurants
    );
    const sortedByAscendingName: Restaurant[] = TestData.sortingName.output;

    // then
    expect(restaurantManager.sortByAscendingName()).to.eql(
      sortedByAscendingName
    );
  });

  it('음식점을 거리순으로 정렬해 반환한다.', () => {
    // given
    const localStorageRestaurants: Restaurant[] =
      TestData.sortingWalkingTime.input;
    const restaurantManager: RestaurantManager = new RestaurantManager(
      localStorageRestaurants
    );
    const sortedByAscendingWalkingTime: Restaurant[] =
      TestData.sortingWalkingTime.output;

    // then
    expect(restaurantManager.sortByAscendingWalkingTime()).to.eql(
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
    expect(restaurantManager.getRestaurants()).to.eql([newRestaurant]);
  });

  const totalRestaurants: Restaurant[] = TestData.filterTests.output;

  const testData: { category: Category; filteredRestaurants: Restaurant[] }[] =
    TestData.filterTests.input;

  testData.forEach(({ category, filteredRestaurants }) => {
    it(`${category}로 정렬한 결과를 받아온다.`, () => {
      // given
      const restaurantManager: RestaurantManager = new RestaurantManager(
        totalRestaurants
      );
      restaurantManager.udateCurentCategoty(category);

      // then
      expect(restaurantManager.filteredRestaurants()).to.eql(
        filteredRestaurants
      );
    });
  });
});
