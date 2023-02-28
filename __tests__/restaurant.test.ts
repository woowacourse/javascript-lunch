import { Restaurant } from '../src/domain/Restaurant';

describe('restaurant 객체 테스트.', () => {
  test('getName은 restaurant의 name 프로퍼티를 반환한다.', () => {
    // given
    const restaurant = new Restaurant({
      category: '양식',
      distance: 10,
      name: '뽀모도로',
    });

    expect(restaurant.getName()).toBe('뽀모도로');
  });

  test('getDistance는 restaurant의 distance 프로퍼티를 반환한다.', () => {
    // given
    const restaurant = new Restaurant({
      category: '양식',
      distance: 10,
      name: '뽀모도로',
    });

    expect(restaurant.getDistance()).toBe(10);
  });

  test('isSameCategory는 restaurant의 category 프로퍼티가 같은지 비교한다.', () => {
    const restaurant = new Restaurant({
      category: '양식',
      distance: 10,
      name: '뽀모도로',
    });

    expect(restaurant.isSameCategory('양식')).toBe(true);
  });
});
