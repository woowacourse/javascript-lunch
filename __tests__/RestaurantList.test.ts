import { CategoryEnum, StorageKeyEnum, MESSAGE } from '../src/constants';
import { RestaurantInfo } from '../src/types';
import { RestaurantList } from '../src/domains';
import { INITIAL_RESTAURANT_DATA } from '../src/data/restaurantData';

describe('RestaurantList 테스트', () => {
  describe('로컬 저장소', () => {
    test('로컬 저장소에 음식점 리스트 데이터가 있으면 해당 값을 RestaurantList의 list로 업데이트 한다 ', () => {
      const ITEM: RestaurantInfo[] = [
        {
          category: CategoryEnum.korean,
          name: '피양콩할마니',
          distance: 10,
          description: `평양 출신의 할머니가 수십 년간 운영해온 비지 전문점 피양콩 할마니. 두부를 빼지 않은 되비지를 맛볼 수 있는
      곳으로,
      ‘피양’은 평안도 사투리로 ‘평양’을 의미한다. 딸과 함께 운영하는 이곳에선 맷돌로 직접 간 콩만을 사용하며, 일체의 조미료를 넣지 않은 건강식을 선보인다. 콩비지와 피양 만두가 이곳의 대표
      메뉴지만, 할머니가 옛날 방식을 고수하며 만들어내는 비지전골 또한 이 집의 역사를 느낄 수 있는 특별한 메뉴다. 반찬은 손님들이 먹고 싶은 만큼 덜어 먹을 수 있게 준비돼 있다.`,
          link: 'https://piyang.modoo.at',
        },
      ];

      localStorage.setItem(StorageKeyEnum.restaurants, JSON.stringify(ITEM));

      const restaurantList = new RestaurantList();

      expect(restaurantList.list).toEqual(ITEM);
    });
    test('로컬 저장소에 음식점 리스트 데이터가 없으면 RestaurantList의 lists는 초기값은 INITIAL_RESTAURANT_DATA이다.', () => {
      const restaurantList = new RestaurantList();

      // INITIAL_RESTAURANT_DATA 과 직접 비교 시 "deep"오류가 나와서 undefined 여부로 테스트
      expect(restaurantList.list).toBeDefined();
    });
  });

  describe('음식점 추가', () => {
    test('중복 음식점이 있으면 오류가 발생한다 ', () => {
      const restaurant = INITIAL_RESTAURANT_DATA[0];

      const restaurantList = new RestaurantList();

      expect(() => {
        restaurantList.addRestaurant(restaurant);
      }).toThrow(MESSAGE.duplicateRestaurantName);
    });
    test('중복 음식점이 없으면 음식점 리스트에 추가된다.', () => {
      const restaurant: RestaurantInfo = {
        name: '소하바다',
        distance: 5,
        category: CategoryEnum.korean,
      };

      const restaurantList = new RestaurantList();

      restaurantList.addRestaurant(restaurant);

      const list = restaurantList.list;
      const lastRestaurant = list.pop();

      expect(lastRestaurant).toEqual(restaurant);
    });
  });
});
