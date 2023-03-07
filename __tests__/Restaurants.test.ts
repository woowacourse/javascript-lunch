import Restaurants from '../src/domain/Restaurants';
import dummyRestaurants from './dummyRestaurants';
import { Restaurant } from '../src/type';

interface MockStorage {
  getItem(key: string): string | null;
}

class LocalStorageMock implements MockStorage {
  getItem(key: string): string | null {
    return null;
  }
}

const mockStorage: MockStorage = new LocalStorageMock();
(global as { localStorage: MockStorage }).localStorage = mockStorage;

describe('레스토랑 목록(Restaurants) 테스트', () => {
  let restaurants: Restaurants;

  beforeEach(() => {
    restaurants = new Restaurants();

    dummyRestaurants.forEach((restaurant: Restaurant) => {
      restaurants.addRestaurant(restaurant);
    });
  });

  test('레스토랑이 추가되고 별다른 필터/정렬 방식 변경 없이 목록을 요청할 경우, 전체/이름순 조건이 적용된 레스토랑을 반환해야 한다.', () => {
    expect(restaurants.getRestaurants()).toEqual([
      dummyRestaurants[3],
      dummyRestaurants[4],
      dummyRestaurants[1],
      dummyRestaurants[2],
      dummyRestaurants[0],
    ]);
  });

  test('레스토랑이 추가되고 정렬 방식을 거리순으로 나열할 경우, 전체/거리순 조건이 적용된 레스토랑을 반환해야 한다.', () => {
    restaurants.setSortBy('distance');

    expect(restaurants.getRestaurants()).toEqual([
      dummyRestaurants[2],
      dummyRestaurants[1],
      dummyRestaurants[4],
      dummyRestaurants[0],
      dummyRestaurants[3],
    ]);
  });

  test('레스토랑이 추가되고 정렬 방식을 이름순으로 나열할 경우, 전체/이름순 조건이 적용된 레스토랑을 반환해야 한다.', () => {
    restaurants.setSortBy('name');

    expect(restaurants.getRestaurants()).toEqual([
      dummyRestaurants[3],
      dummyRestaurants[4],
      dummyRestaurants[1],
      dummyRestaurants[2],
      dummyRestaurants[0],
    ]);
  });

  test('레스토랑이 추가되고 정렬 방식을 이름순, 필터를 중식으로 결정할 경우, 중식/이름순 조건이 적용된 레스토랑을 반환해야 한다.', () => {
    restaurants.setSortBy('name');
    restaurants.setFilterBy('중식');

    expect(restaurants.getRestaurants()).toEqual([
      dummyRestaurants[4],
      dummyRestaurants[2],
    ]);
  });

  test('레스토랑이 추가되고 정렬 방식을 거리순, 필터를 중식으로 결정할 경우, 중식/거리순 조건이 적용된 레스토랑을 반환해야 한다.', () => {
    restaurants.setSortBy('distance');
    restaurants.setFilterBy('중식');

    expect(restaurants.getRestaurants()).toEqual([
      dummyRestaurants[2],
      dummyRestaurants[4],
    ]);
  });

  test('레스토랑이 추가되고 정렬 방식을 거리순, 필터를 양식으로 결정할 경우, 양식/거리순 조건이 적용된 레스토랑을 반환해야 한다.', () => {
    restaurants.setSortBy('distance');
    restaurants.setFilterBy('양식');

    expect(restaurants.getRestaurants()).toEqual([dummyRestaurants[3]]);
  });
});
