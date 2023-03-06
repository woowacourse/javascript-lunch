import Restaurants from '../src/domain/Restaurants';
import { Restaurant } from '../src/type/common';
import { menu1, menu2, menu3, menu4 } from '../src/data/dummy';

describe('Restaurants 클래스 테스트', () => {
  test('음식점 추가 기능 테스트', () => {
    const restaurants = new Restaurants();
    restaurants.addRestaurant(menu1);

    expect(restaurants.getRestaurants()).toEqual([menu1]);
  });

  test('음식점을 이름 별로 정렬하는 기능 테스트', () => {
    const restaurants = new Restaurants();
    restaurants.addRestaurant(menu1);
    restaurants.addRestaurant(menu2);
    restaurants.addRestaurant(menu3);

    expect(restaurants.sortByName()).toEqual([menu3, menu2, menu1]);
  });

  test('음식점을 거리로 정렬하는 기능 테스트', () => {
    const restaurants = new Restaurants();
    restaurants.addRestaurant(menu2);
    restaurants.addRestaurant(menu1);
    restaurants.addRestaurant(menu3);

    expect(restaurants.sortByDistance()).toEqual([menu1, menu2, menu3]);
  });

  test('음식점을 카테고리 별로 정렬하는 기능 테스트', () => {
    const restaurants = new Restaurants();
    restaurants.addRestaurant(menu2);
    restaurants.addRestaurant(menu1);
    restaurants.addRestaurant(menu3);
    restaurants.addRestaurant(menu4);

    expect(restaurants.filterByCategory('양식')).toEqual([menu1, menu4]);
  });
});
