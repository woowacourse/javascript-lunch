import Restaurant from '../../src/domain/Restaurant';
import RestaurantList from '../../src/domain/RestaurantList';

type IStorage = Record<string, string | null>;

describe('RestaurantList 도메인 테스트', () => {
  beforeEach(() => {
    const storage: IStorage = { restaurants: null };
    cy.stub(localStorage, 'getItem', (key: string) => storage[key]);
    cy.stub(localStorage, 'setItem', (key, value) => {
      storage[key] = value;
    });
  });

  it('음식점 목록에 새로운 음식점을 추가할 수 있다.', () => {
    const RESTAURANT_1 = new Restaurant({
      id: '0',
      category: '아시안',
      name: 'cypress',
      distance: 30,
      isFavorite: false,
    });
    const RESTAURANT_2 = new Restaurant({ id: '1', category: '중식', name: 'apple', distance: 15, isFavorite: false });
    const RESTAURANT_3 = new Restaurant({ id: '2', category: '일식', name: 'banana', distance: 5, isFavorite: false });
    const RESTAURANT_LIST = new RestaurantList([RESTAURANT_1, RESTAURANT_2]);

    RESTAURANT_LIST.add(RESTAURANT_3);

    expect(RESTAURANT_LIST.restaurants.length).to.equal(3);
  });

  it('아시안 음식을 카테고리로 선택할 경우, 아시안 음식점만 필터링하여 반환한다.', () => {
    const RESTAURANT_1 = new Restaurant({
      id: '0',
      category: '아시안',
      name: 'cypress',
      distance: 30,
      isFavorite: false,
    });
    const RESTAURANT_2 = new Restaurant({ id: '1', category: '중식', name: 'apple', distance: 15, isFavorite: false });
    const RESTAURANT_3 = new Restaurant({
      id: '2',
      category: '아시안',
      name: 'banana',
      distance: 5,
      isFavorite: false,
    });
    const RESTAURANT_LIST = new RestaurantList([RESTAURANT_1, RESTAURANT_2, RESTAURANT_3]);
    const FILTERED_COUNT = 2;

    RESTAURANT_LIST.filterByCategory('아시안', 'all');
    const RESULT = RESTAURANT_LIST.getSortedByName();

    expect(RESULT.length).to.equal(FILTERED_COUNT);
  });

  describe('RestaurantList 정렬 메서드 테스트', () => {
    it('음식점 목록을 이름순으로 정렬할 경우, apple 이름을 가진 2번 음식점이 맨 앞으로 온다.', () => {
      const RESTAURANT_1 = new Restaurant({
        id: '0',
        category: '아시안',
        name: 'cypress',
        distance: 30,
        isFavorite: false,
      });
      const RESTAURANT_2 = new Restaurant({
        id: '1',
        category: '중식',
        name: 'apple',
        distance: 15,
        isFavorite: false,
      });
      const RESTAURANT_3 = new Restaurant({
        id: '2',
        category: '아시안',
        name: 'banana',
        distance: 5,
        isFavorite: false,
      });
      const RESTAURANT_LIST = new RestaurantList([RESTAURANT_1, RESTAURANT_2, RESTAURANT_3]);

      const RESULT = RESTAURANT_LIST.getSortedByName();

      expect(RESULT[0]).to.deep.equal(RESTAURANT_2);
    });

    it('음식점 목록을 거리순으로 정렬할 경우, distance의 최솟값 5을 가진 3번 음식점이 맨 앞으로 온다.', () => {
      const RESTAURANT_1 = new Restaurant({
        id: '0',
        category: '아시안',
        name: 'cypress',
        distance: 30,
        isFavorite: false,
      });
      const RESTAURANT_2 = new Restaurant({
        id: '1',
        category: '중식',
        name: 'apple',
        distance: 15,
        isFavorite: false,
      });
      const RESTAURANT_3 = new Restaurant({
        id: '2',
        category: '아시안',
        name: 'banana',
        distance: 5,
        isFavorite: false,
      });
      const RESTAURANT_LIST = new RestaurantList([RESTAURANT_1, RESTAURANT_2, RESTAURANT_3]);

      const RESULT = RESTAURANT_LIST.getSortedByDistance();

      expect(RESULT[0]).to.deep.equal(RESTAURANT_3);
    });
  });
});
