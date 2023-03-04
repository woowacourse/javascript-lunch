import { Restaurant } from '../src/domain/Restaurant';

describe('restaurant 객체 테스트.', () => {
  test('compareName은 restaurant 인스턴스들의 name 프로퍼티를 오름차순으로 비교한다.', () => {
    // given
    const bbomodoro = new Restaurant({
      category: '양식',
      distance: 10,
      name: '뽀모도로',
    });
    const addal = new Restaurant({
      category: '기타',
      distance: 20,
      name: '아딸',
    });

    expect(bbomodoro.compareName(addal)).toBeLessThan(0);
  });

  test('compareDistance는 restaurant 인스턴스들의 distance 프로퍼티를 오름차순으로 비교한다.', () => {
    // given
    const bbomodoro = new Restaurant({
      category: '양식',
      distance: 10,
      name: '뽀모도로',
    });
    const addal = new Restaurant({
      category: '기타',
      distance: 20,
      name: '아딸',
    });

    expect(bbomodoro.compareDistance(addal)).toBeLessThan(0);
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
