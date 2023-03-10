import Restaurants from '../src/domain/Restaurants';
import {
  correctUserInputs,
  restaurantsNoFavoriteSample,
} from '../testcase/unit-testcase';

interface MockStorage {
  getItem(key: string): string | null;
}

class LocalStorageMock implements MockStorage {
  getItem(key: string): string | null {
    return null;
  }
}

const mockStorage: MockStorage = new LocalStorageMock();
(global as { localStorage: MockStorage }).localStorage = mockStorage;

describe('레스토랑 저장소 테스트 (Restaurant)', () => {
  let restaurants = new Restaurants();
  beforeEach(() => {
    restaurants = new Restaurants();
  });
  describe('1. 데이터 관리 테스트', () => {
    test('새로운 레스토랑을 추가한 후 목록을 요청하면, 레스토랑의 목록이 사전순으로 반환되어야 한다.', () => {
      restaurants.addRestaurant(correctUserInputs[0]);

      expect(restaurants.getRestaurants()).toEqual([
        restaurantsNoFavoriteSample[0],
      ]);

      restaurants.addRestaurant(correctUserInputs[1]);
      restaurants.addRestaurant(correctUserInputs[2]);

      expect(restaurants.getRestaurants()).toEqual([
        restaurantsNoFavoriteSample[1],
        restaurantsNoFavoriteSample[2],
        restaurantsNoFavoriteSample[0],
      ]);
    });

    test('레스토랑을 삭제한 후 목록을 요청하면, 레스토랑의 목록이 사전순으로 반환되어야 한다.', () => {
      restaurants.addRestaurant(correctUserInputs[0]);
      restaurants.addRestaurant(correctUserInputs[1]);
      restaurants.addRestaurant(correctUserInputs[2]);

      restaurants.deleteRestaurantById(2);

      expect(restaurants.getRestaurants()).toEqual([
        restaurantsNoFavoriteSample[1],
        restaurantsNoFavoriteSample[0],
      ]);
    });
  });

  describe('2. 아이디를 이용한 레스토랑 불러오기 테스트', () => {
    test('아이디가 주어지면, 올바른 레스토랑을 불러와야 한다.', () => {
      restaurants.addRestaurant(correctUserInputs[3]);
      restaurants.addRestaurant(correctUserInputs[4]);
      restaurants.addRestaurant(correctUserInputs[1]);

      expect(restaurants.getRestaurantById(0)).toEqual({
        category: '양식',
        name: '더 그릴',
        distanceInMinutes: '30',
        description: '',
        link: '',
        isFavorite: false,
        itemId: 0,
      });

      expect(restaurants.getRestaurantById(1)).toEqual({
        category: '중식',
        name: '루왕탕수육',
        distanceInMinutes: '15',
        description:
          '육즙이 풍부한 탕수육과 함께 고추가루를 올린 루왕탕수육을 맛볼 수 있는 중식당',
        link: 'https://www.luwangtangsuik.com/',
        isFavorite: false,
        itemId: 1,
      });

      expect(restaurants.getRestaurantById(2)).toEqual({
        category: '일식',
        name: '삼베스시',
        distanceInMinutes: '10',
        description:
          '신선한 재료와 정교한 손질법으로 만든 최상의 회와 일본식 요리를 즐길 수 있는 일식 전문점',
        link: 'https://sambesushi.com/main.html',
        isFavorite: false,
        itemId: 2,
      });
    });
  });

  describe('3. 즐겨찾기 토글 테스트', () => {
    test('즐겨찾기를 토글할 때마다 즐겨찾기 여부가 설정/해제 되어야 한다.', () => {
      restaurants.addRestaurant(correctUserInputs[0]);
      restaurants.addRestaurant(correctUserInputs[1]);

      restaurants.toggleFavorite(0);
      expect(restaurants.getRestaurantById(0).isFavorite).toBe(true);
      expect(restaurants.getRestaurantById(1).isFavorite).toBe(false);

      restaurants.toggleFavorite(0);
      expect(restaurants.getRestaurantById(0).isFavorite).toBe(false);
      expect(restaurants.getRestaurantById(1).isFavorite).toBe(false);
    });
  });

  describe('4. 링크 변환 테스트', () => {
    test('http:// 또는 https:// 로 시작하지 않지만 유효한 주소인 경우, 앞에 https:// 를 붙여야 한다.', () => {
      restaurants.addRestaurant({
        category: '기타',
        name: '링크 변환 테스트',
        distanceInMinutes: '5',
        description: '이 레스토랑은 https:// 를 앞에 붙여야 합니다.',
        link: 'nohttpsite.net',
      });

      expect(restaurants.getRestaurantById(0).link).toBe(
        'https://nohttpsite.net'
      );
    });

    test('http:// 또는 https:// 로 시작하는 경우에는, 주소를 변경하지 않아야 한다.', () => {
      restaurants.addRestaurant({
        category: '한식',
        name: '링크 변환 테스트',
        distanceInMinutes: '5',
        description: '',
        link: 'https://testsite.com/',
      });

      restaurants.addRestaurant({
        category: '아시안',
        name: '링크 변환 테스트',
        distanceInMinutes: '5',
        description: '',
        link: 'http://testsite.com/',
      });

      expect(restaurants.getRestaurantById(0).link).toBe(
        'https://testsite.com/'
      );

      expect(restaurants.getRestaurantById(1).link).toBe(
        'http://testsite.com/'
      );
    });
  });
});
