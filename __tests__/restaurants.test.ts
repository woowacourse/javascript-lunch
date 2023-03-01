import Restaurants from '../src/domain/Restaurants';
import { Restaurant } from '../src/types/Types';

describe('Restaurants 도메인 테스트', () => {
  const restaurants = new Restaurants();

  const yeoptoRestaurant: Restaurant = {
    category: '기타',
    name: '엽토네 떡볶이',
    distance: 5,
    description: 'undefined',
    link: 'undefined',
  };

  const doriRestaurant: Restaurant = {
    category: '한식',
    name: '도리네 집밥',
    distance: 15,
    description: 'undefined',
    link: 'undefined',
  };

  const gongwonRestaurant: Restaurant = {
    category: '일식',
    name: '공원네 초밥집',
    distance: 10,
    description: 'undefined',
    link: 'undefined',
  };

  test('음식점 목록을 추가하는 기능 테스트', () => {
    restaurants.add(yeoptoRestaurant);
    restaurants.add(doriRestaurant);
    restaurants.add(gongwonRestaurant);

    expect(restaurants.restaurants.length).toBe(3);
    expect(restaurants.restaurants[0].description).toBe('');
  });

  test('음식점 목록을 타입에 따라 정렬하는 기능 테스트 ', () => {
    const sortedByName = restaurants.sortByType('이름순', restaurants.restaurants);
    const sortedByDistance = restaurants.sortByType('거리순', restaurants.restaurants);

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
});
