import RestaurantManager from '../src/domain/RestaurantManager';

describe('RestaurantManager 기능 테스트', () => {
  const RESTARANT_A = {
    category: '분식',
    name: '맛있는 집',
    distance: 15,
  };
  const RESTARANT_B = {
    category: '기타',
    name: '맛없는 집',
    distance: 10,
  };
  const RESTARANT_C = {
    category: '분식',
    name: '우리할매 떡볶이',
    distance: 5,
  };
  const RESTAURANT_INFOS = [RESTARANT_A, RESTARANT_B, RESTARANT_C];

  const manager = new RestaurantManager();
  beforeAll(() => {
    RESTAURANT_INFOS.forEach((info) => manager.add(info));
  });

  describe('add 기능 테스트', () => {
    test('카테고리, 이름, 거리 정보(설명, 링크)를 전달 받아 레스토랑 리스트에 저장한다.', () => {
      const RESULT = RESTAURANT_INFOS;

      expect(manager.restaurants).toEqual(RESULT);
    });
  });

  describe('filterByCategory 기능 테스트', () => {
    test('카테고리를 전달받아 해당 카테고리를 갖는 객체 배열을 반환한다.', () => {
      const RESULT = [RESTARANT_A, RESTARANT_C];
      const CATEGORY = '분식';

      expect(manager.filterByCategory(CATEGORY)).toEqual(RESULT);
    });
  });

  describe('sortByName 기능 테스트', () => {
    test('이름을 기준으로 레스토랑 배열을 오름차순 정렬한 결과를 반환한다.', () => {
      const RESULT = [RESTARANT_B, RESTARANT_A, RESTARANT_C];

      expect(manager.sortByName()).toEqual(RESULT);
    });
  });

  describe('sortByDistance 기능 테스트', () => {
    test('거리를 기준으로 레스토랑 배열을 오름차순 정렬한 결과를 반환한다.', () => {
      const RESULT = [RESTARANT_C, RESTARANT_B, RESTARANT_A];

      expect(manager.sortByDistance()).toEqual(RESULT);
    });
  });
});
