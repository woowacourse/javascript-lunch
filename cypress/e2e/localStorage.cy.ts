import Restaurant from '../../src/domain/Restaurant';
import RestaurantList from '../../src/domain/RestaurantList';
import type { IRestaurantList } from '../../src/types/restaurant';

type IStorage = Record<string, string>;

describe('localStorage 테스트', () => {
  const storage: IStorage = { restaurants: '' };
  beforeEach(() => {
    cy.stub(localStorage, 'getItem', key => storage[key]);
    cy.stub(localStorage, 'setItem', (key, value) => {
      storage[key] = value;
    });
  });

  it('음식점 목록에 추가한 음식점이 localStorage에 잘 반영되는지 확인한다.', () => {
    const stringifyFn = (array: IRestaurantList): string => JSON.stringify(array);
    const parseFn = (value: string): IRestaurantList => JSON.parse(value);
    const STORAGE_KEY = 'restaurants';
    const RESTAURANT_1 = new Restaurant({ category: '아시안', name: 'cypress', distance: 30, favorite: 'N' });
    const RESTAURANT_2 = new Restaurant({ category: '중식', name: 'apple', distance: 15, favorite: 'N' });
    const RESTAURANT_3 = new Restaurant({ category: '아시안', name: 'banana', distance: 5, favorite: 'N' });
    const RESTAURANT_LIST = new RestaurantList([RESTAURANT_1, RESTAURANT_2, RESTAURANT_3]);
    localStorage.setItem(STORAGE_KEY, stringifyFn([RESTAURANT_1, RESTAURANT_2]));

    const PREV_RESTAURANT_LIST = new RestaurantList([RESTAURANT_1, RESTAURANT_2]);

    PREV_RESTAURANT_LIST.add(RESTAURANT_3);
    const CURRENT_RESTAURANT_LIST = localStorage.getItem(STORAGE_KEY);
    if (CURRENT_RESTAURANT_LIST !== null) {
      const RESULT = new RestaurantList(parseFn(CURRENT_RESTAURANT_LIST));
      expect(RESULT).to.deep.equal(RESTAURANT_LIST);
    }
  });
});
