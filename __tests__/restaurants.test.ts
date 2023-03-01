import Restaurants from '../src/domain/Restaurants';
import { Restaurant } from '../src/types/Types';

describe('Restaurants 도메인 테스트', () => {
  const restaurants = new Restaurants();

  test('음식점 목록을 추가하는 기능 테스트', () => {
    const restaurant: Restaurant = {
      category: '기타',
      name: '엽토네 떡볶이',
      distance: 5,
      description: 'undefined',
      link: 'undefined',
    };

    restaurants.add(restaurant);

    expect(restaurants.restaurants.length).toBe(1);
    expect(restaurants.restaurants[0].description).toBe('');
  });
});
