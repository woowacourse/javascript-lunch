import Restaurant from '../../src/Restaurant';
import RestaurantList from '../../src/RestaurantList';

describe('RestaurantList 도메인 테스트', () => {
  it('음식점 목록에 새로운 음식점을 추가할 수 있다.', () => {
    const RESTAURANT_1 = new Restaurant({ category: '아시안', name: 'cypress', distance: 30 });
    const RESTAURANT_2 = new Restaurant({ category: '중식', name: 'apple', distance: 15 });
    const RESTAURANT_3 = new Restaurant({ category: '일식', name: 'banana', distance: 5 });
    const RESTAURANT_LIST = new RestaurantList([RESTAURANT_1, RESTAURANT_2]);
    RESTAURANT_LIST.add(RESTAURANT_3);

    expect(RESTAURANT_LIST.restaurants.length).to.equal(3);
  });

  it('음식점 목록을 사용자가 원하는 카테고리로 필터링 할 수 있다.', () => {
    const RESTAURANT_1 = new Restaurant({ category: '아시안', name: 'cypress', distance: 30 });
    const RESTAURANT_2 = new Restaurant({ category: '중식', name: 'apple', distance: 15 });
    const RESTAURANT_3 = new Restaurant({ category: '아시안', name: 'banana', distance: 5 });
    const RESTAURANT_LIST = new RestaurantList([RESTAURANT_1, RESTAURANT_2, RESTAURANT_3]);
    const RESULT = RESTAURANT_LIST.filterByCategory('아시안');

    expect(RESULT.length).to.equal(2);
  });
});
