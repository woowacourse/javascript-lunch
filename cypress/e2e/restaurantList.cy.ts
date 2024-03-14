import Restaurant from '../../src/domain/Restaurant';
import RestaurantList from '../../src/domain/RestaurantList';

describe('RestaurantList 도메인 테스트', () => {
  it('음식점 목록에 새로운 음식점을 추가할 수 있다.', () => {
    const RESTAURANT_1 = new Restaurant({ category: '아시안', name: 'cypress', distance: 30, favorite: 'N' });
    const RESTAURANT_2 = new Restaurant({ category: '중식', name: 'apple', distance: 15, favorite: 'N' });
    const RESTAURANT_3 = new Restaurant({ category: '일식', name: 'banana', distance: 5, favorite: 'N' });
    const RESTAURANT_LIST = new RestaurantList([RESTAURANT_1, RESTAURANT_2]);

    RESTAURANT_LIST.add(RESTAURANT_3);

    expect(RESTAURANT_LIST.restaurants.length).to.equal(3);
  });

  it('음식점 목록을 사용자가 원하는 카테고리로 필터링 할 수 있다.', () => {
    const RESTAURANT_1 = new Restaurant({ category: '아시안', name: 'cypress', distance: 30, favorite: 'N' });
    const RESTAURANT_2 = new Restaurant({ category: '중식', name: 'apple', distance: 15, favorite: 'N' });
    const RESTAURANT_3 = new Restaurant({ category: '아시안', name: 'banana', distance: 5, favorite: 'N' });
    const RESTAURANT_LIST = new RestaurantList([RESTAURANT_1, RESTAURANT_2, RESTAURANT_3]);
    const FILTERED_COUNT = 2;

    RESTAURANT_LIST.filterByCategory('아시안');
    const RESULT = RESTAURANT_LIST.getSortedByName();

    expect(RESULT.length).to.equal(FILTERED_COUNT);
  });

  describe('RestaurantList 정렬 메서드 테스트', () => {
    it('음식점 목록을 이름순으로 정렬할 수 있다.', () => {
      const RESTAURANT_1 = new Restaurant({ category: '아시안', name: 'cypress', distance: 30, favorite: 'N' });
      const RESTAURANT_2 = new Restaurant({ category: '중식', name: 'apple', distance: 15, favorite: 'N' });
      const RESTAURANT_3 = new Restaurant({ category: '아시안', name: 'banana', distance: 5, favorite: 'N' });
      const RESTAURANT_LIST = new RestaurantList([RESTAURANT_1, RESTAURANT_2, RESTAURANT_3]);
      const SORTED_RESTAURANT_LIST = new RestaurantList([RESTAURANT_2, RESTAURANT_3, RESTAURANT_1]);

      const RESULT = RESTAURANT_LIST.getSortedByName();

      expect(RESULT).to.deep.equal(SORTED_RESTAURANT_LIST.restaurants);
    });

    it('음식점 목록을 거리순으로 정렬할 수 있다.', () => {
      const RESTAURANT_1 = new Restaurant({ category: '아시안', name: 'cypress', distance: 30, favorite: 'N' });
      const RESTAURANT_2 = new Restaurant({ category: '중식', name: 'apple', distance: 15, favorite: 'N' });
      const RESTAURANT_3 = new Restaurant({ category: '아시안', name: 'banana', distance: 5, favorite: 'N' });
      const RESTAURANT_LIST = new RestaurantList([RESTAURANT_1, RESTAURANT_2, RESTAURANT_3]);
      const SORTED_RESTAURANT_LIST = new RestaurantList([RESTAURANT_3, RESTAURANT_2, RESTAURANT_1]);

      const RESULT = RESTAURANT_LIST.getSortedByDistance();

      expect(RESULT).to.deep.equal(SORTED_RESTAURANT_LIST.restaurants);
    });
  });
});
