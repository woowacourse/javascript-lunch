import Restaurants from '../src/domain/Restaurants';
import { Restaurant } from '../src/types/Types';

describe('Restaurants 도메인 테스트', () => {
  const yeoptoRestaurant: Restaurant = {
    category: '기타',
    name: '엽토네 떡볶이',
    distance: 5,
  };

  const doriRestaurant: Restaurant = {
    category: '한식',
    name: '도리네 집밥',
    distance: 15,
  };

  const restaurants = new Restaurants([]);

  const gongwonRestaurant: Restaurant = {
    category: '일식',
    name: '공원네 초밥집',
    distance: 10,
  };

  test('음식점 목록을 추가하는 기능 테스트', () => {
    restaurants.add(gongwonRestaurant);
    restaurants.add(yeoptoRestaurant);
    restaurants.add(doriRestaurant);

    expect(restaurants.restaurants.length).toBe(3);
    expect(restaurants.restaurants[0].description).toBe('');
  });

  test('음식점 목록을 타입에 따라 정렬하는 기능 테스트 ', () => {
    const sortedByName = Restaurants.sortByType({ value: 'name' }, restaurants.restaurants);
    const sortedByDistance = Restaurants.sortByType({ value: 'distance' }, restaurants.restaurants);

    expect(sortedByName.map(restaurant => restaurant.name)).toStrictEqual([
      '공원네 초밥집',
      '도리네 집밥',
      '엽토네 떡볶이',
    ]);

    expect(sortedByDistance.map(restaurant => restaurant.name)).toStrictEqual([
      '엽토네 떡볶이',
      '공원네 초밥집',
      '도리네 집밥',
    ]);
  });

  test('음식점을 분류 카테고리에 따라 필터링 하는 기능 테스트', () => {
    expect(Restaurants.filterByCategory({ value: '한식' }, restaurants.restaurants)[0].name).toBe('도리네 집밥');
  });
});
