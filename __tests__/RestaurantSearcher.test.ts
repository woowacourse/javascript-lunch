import RestaurantSearcher from '../src/domain/RestaurantSearcher';
import dummyRestaurants from '../src/dummy/dummyRestaurants';

const restaurantSearcher = new RestaurantSearcher();

describe('레스토랑 필터링 테스트 (RestaurantFilter)', () => {
  test('기본 필터링 조건일 때, 올바른 필터링 결과를 반환해야 한다.', () => {
    const filterProperties = {
      filterBy: '전체',
      sortBy: 'name',
      favoriteBy: 'all',
    };

    const expectedResult = [
      dummyRestaurants[3],
      dummyRestaurants[4],
      dummyRestaurants[1],
      dummyRestaurants[2],
      dummyRestaurants[0],
    ];

    expect(
      restaurantSearcher.search(dummyRestaurants, filterProperties)
    ).toEqual(expectedResult);
  });

  test('정렬이 거리 순일 경우, 거리가 가까운 순으로 정렬된 결과를 반환해야 한다.', () => {
    const filterProperties = {
      filterBy: '전체',
      sortBy: 'distanceInMinutes',
      favoriteBy: 'all',
    };

    const expectedResult = [
      dummyRestaurants[2],
      dummyRestaurants[1],
      dummyRestaurants[4],
      dummyRestaurants[0],
      dummyRestaurants[3],
    ];

    expect(
      restaurantSearcher.search(dummyRestaurants, filterProperties)
    ).toEqual(expectedResult);
  });

  test('필터링이 중식이고, 정렬 조건이 거리순일 경우, 거리가 가까운 순서대로, 중식 음식점만 반환해야 한다.', () => {
    const filterProperties = {
      filterBy: '중식',
      sortBy: 'distance',
      favoriteBy: 'all',
    };

    const expectedResult = [dummyRestaurants[2], dummyRestaurants[4]];

    expect(
      restaurantSearcher.search(dummyRestaurants, filterProperties)
    ).toEqual(expectedResult);
  });

  test('즐겨찾기 필터가 켜져 있으면, 다른 필터를 무시하고 즐겨찾기 필터만 적용하여 이름순으로 반환하여야 한다.', () => {
    const filterProperties = {
      filterBy: '전체',
      sortBy: 'name',
      favoriteBy: 'favorite',
    };

    const expectedResult = [
      dummyRestaurants[3],
      dummyRestaurants[1],
      dummyRestaurants[2],
    ];

    expect(
      restaurantSearcher.search(dummyRestaurants, filterProperties)
    ).toEqual(expectedResult);
  });

  test('조건을 만족하는 음식점이 없다면 빈 검색 결과를 반환해야 한다.', () => {
    const filterProperties = {
      filterBy: '기타',
      sortBy: 'distance',
      favoriteBy: 'all',
    };

    const expectedResult = [];

    expect(
      restaurantSearcher.search(dummyRestaurants, filterProperties)
    ).toEqual(expectedResult);
  });
});
