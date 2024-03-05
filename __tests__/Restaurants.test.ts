import Restaurant from '../src/domain/Restaurant';
import Restaurants from '../src/domain/Restaurants';
import data from './data';

const { restaurantA, restaurantB, restaurantC, restaurantD, restaurantE, restaurantF } = data;

describe('음식점 목록 기능 단위 테스트', () => {
  const restaurants = new Restaurants();

  restaurants.addRestaurant(new Restaurant(restaurantA));
  restaurants.addRestaurant(new Restaurant(restaurantB));
  restaurants.addRestaurant(new Restaurant(restaurantC));
  restaurants.addRestaurant(new Restaurant(restaurantD));
  restaurants.addRestaurant(new Restaurant(restaurantE));
  restaurants.addRestaurant(new Restaurant(restaurantF));

  test.each([
    ['한식', new Restaurant(restaurantA)],
    ['중식', new Restaurant(restaurantB)],
    ['일식', new Restaurant(restaurantC)],
    ['아시안', new Restaurant(restaurantD)],
    ['양식', new Restaurant(restaurantE)],
    ['기타', new Restaurant(restaurantF)],
  ])('음식점 목록 중 "%s" 인 카테고리만 필터링 할 수 있다.', (category: string, restaurant: Restaurant) => {
    expect(restaurants.getFilteredByCategory(category)).toEqual([restaurant]);
  });

  test('음식점 목록을 이름 순으로 정렬할 수 있다.', () => {
    const result = [
      new Restaurant(restaurantF),
      new Restaurant(restaurantE),
      new Restaurant(restaurantD),
      new Restaurant(restaurantA),
      new Restaurant(restaurantB),
      new Restaurant(restaurantC),
    ];

    expect(restaurants.getSortedByName()).toEqual(result);
  });
});
