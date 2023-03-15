/**
 * @jest-environment jsdom
 */

import Restaurants from '../src/domain/Restaurants';
import { Restaurant } from '../src/types/Types';

describe('Restaurants 도메인 테스트', () => {
  const yeoptoRestaurant: Restaurant = {
    id: '1123124',
    category: '기타',
    name: '엽토네 떡볶이',
    distance: 5,
    description: 'undefined',
    link: 'undefined',
    favorites: false,
  };

  const doriRestaurant: Restaurant = {
    id: '1123125',
    category: '한식',
    name: '도리네 집밥',
    distance: 15,
    description: 'undefined',
    link: 'undefined',
    favorites: false,
  };

  const restaurants = new Restaurants([yeoptoRestaurant, doriRestaurant]);

  const gongwonRestaurant: Restaurant = {
    id: '1123126',
    category: '일식',
    name: '공원네 초밥집',
    distance: 10,
    description: 'undefined',
    link: 'undefined',
    favorites: false,
  };

  test('음식점 목록을 추가하는 기능 테스트', () => {
    restaurants.add(gongwonRestaurant);

    expect(restaurants.restaurantsList.length).toBe(3);
    expect(restaurants.restaurantsList[0].description).toBe('');
  });

  test('음식점 목록을 타입에 따라 정렬하는 기능 테스트 ', () => {
    const sortedByName = restaurants.sortByType('name', restaurants.restaurantsList);
    const sortedByDistance = restaurants.sortByType('distance', restaurants.restaurantsList);

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
    expect(restaurants.filterByCategory('한식', restaurants.restaurantsList)[0].name).toBe('도리네 집밥');
  });

  test('음식점이 즐겨찾기 되어있는지 확인한다', () => {
    restaurants.setFavoriteState(yeoptoRestaurant.id);

    expect(yeoptoRestaurant.favorites).toBe(true);
  });

  test('즐겨찾기 된 음식점만 가져오는지 확인한다', () => {
    const favoriteRestaurantList = restaurants.getFavoriteRestaurantList();

    expect(favoriteRestaurantList[0].name).toBe('엽토네 떡볶이');
  });

  test('음식점을 삭제하는지 확인한다', () => {
    restaurants.remove(doriRestaurant.id);

    expect(restaurants.restaurantsList.length).toBe(2);
  });
});
