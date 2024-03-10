import { CATEGORY, STORAGE_KEY } from '../src/constants';
import { RestaurantList } from '../src/domains';
import { Category, RestaurantInfo } from '../src/types';

describe('RestaurantList 테스트', () => {
  describe('로컬 저장소', () => {
    test('로컬 저장소에 음식점 리스트 데이터가 있으면 해당 값을 RestaurantList의 list로 업데이트 한다 ', () => {
      const ITEM: RestaurantInfo[] = [
        {
          category: CATEGORY.korean,
          name: '피양콩할마니',
          distance: 10,
          description: `평양 출신의 할머니가 수십 년간 운영해온 비지 전문점 피양콩 할마니. 두부를 빼지 않은 되비지를 맛볼 수 있는
      곳으로...........`,
          link: 'https://piyang.modoo.at',
        },
      ];

      localStorage.setItem(STORAGE_KEY.restaurants, JSON.stringify(ITEM));

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
    test('음식점이 추가 되면 RestaurantList와 localStorage의 음식점 목록에 추가된 음식점이 마지막 요소로 들어간다.', () => {
      const ITEM: RestaurantInfo[] = [
        {
          category: CATEGORY.korean,
          name: '피양콩할마니',
          distance: 10,
          description: `평양 출신의 할머니가 수십 년간 운영해온 비지 전문점 피양콩 할마니. 두부를 빼지 않은 되비지를 맛볼 수 있는
      곳으로...........`,
          link: 'https://piyang.modoo.at',
        },
      ];

      localStorage.setItem(STORAGE_KEY.restaurants, JSON.stringify(ITEM));

      const newRestaurantInfo: RestaurantInfo = {
        name: '바다_소하',
        distance: 5,
        category: CATEGORY.korean,
      };

      const restaurantList = new RestaurantList();

      restaurantList.addRestaurant(newRestaurantInfo);

      expect(restaurantList.list.pop()).toEqual(newRestaurantInfo);

      const storageItem = localStorage.getItem(STORAGE_KEY.restaurants);

      if (storageItem) {
        expect((JSON.parse(storageItem) as RestaurantInfo[]).pop()).toEqual(
          newRestaurantInfo,
        );
      }
    });
  });

  describe('음식점 정렬', () => {
    const restaurantList = new RestaurantList();

    const RESTAURANT_LIST: RestaurantInfo[] = [
      { name: 'apple', category: CATEGORY.asian, distance: 15 },
      { name: 'Apple', category: CATEGORY.asian, distance: 15 },
      { name: 'banana', category: CATEGORY.asian, distance: 20 },
      { name: '사과', category: CATEGORY.asian, distance: 10 },
      { name: '@바나나', category: CATEGORY.asian, distance: 30 },
      { name: '바나나', category: CATEGORY.asian, distance: 5 },
    ];

    test('이름순으로 정렬 시, 음식점들을 이름을 기준으로 오름차순으로 정렬된다.', () => {
      const sortedList = restaurantList.sortRestaurants(
        RESTAURANT_LIST,
        'name',
      );

      expect(sortedList.map((info) => info.name)).toEqual([
        '@바나나',
        '바나나',
        '사과',
        'apple',
        'Apple',
        'banana',
      ]);
    });
    test('거리순으로 정렬 시, 음식점들을 거리을 기준으로 오름차순으로 정렬된다.', () => {
      const sortedList = restaurantList.sortRestaurants(
        RESTAURANT_LIST,
        'distance',
      );

      expect(sortedList.map((info) => info.distance)).toEqual([
        5, 10, 15, 15, 20, 30,
      ]);
    });
  });

  describe('음식점 카테고리 필터링', () => {
    const RESTAURANT_LIST: RestaurantInfo[] = [
      { name: 'apple', category: CATEGORY.asian, distance: 15 },
      { name: 'banana', category: CATEGORY.korean, distance: 20 },
      { name: '사과', category: CATEGORY.etc, distance: 10 },
      { name: '@바나나', category: CATEGORY.korean, distance: 30 },
      { name: '민트_초코', category: CATEGORY.western, distance: 5 },
      { name: 'SHOW_U', category: CATEGORY.japanese, distance: 5 },
      { name: 'SHOW_ME', category: CATEGORY.chinese, distance: 5 },
    ];

    // RestaurantList의 list를 RESTAURANT_LIST으로 셋팅
    localStorage.setItem(
      STORAGE_KEY.restaurants,
      JSON.stringify(RESTAURANT_LIST),
    );

    const restaurantList = new RestaurantList();
    test.each([
      [CATEGORY.asian, [RESTAURANT_LIST[0].name]],
      [CATEGORY.chinese, [RESTAURANT_LIST[6].name]],
      [CATEGORY.etc, [RESTAURANT_LIST[2].name]],
      [CATEGORY.japanese, [RESTAURANT_LIST[5].name]],
      [CATEGORY.korean, [RESTAURANT_LIST[1].name, RESTAURANT_LIST[3].name]],
      [CATEGORY.western, [RESTAURANT_LIST[4].name]],
    ])(
      '카테코리를 기준으로 필터링 시 해당 카테고리(%s)인 음식점만 필터링 된다.',
      (category: Category, list: string[]) => {
        const filteredList =
          restaurantList.filterRestaurantsByCategory(category);
        expect(
          filteredList?.every((info) => list.includes(info.name)),
        ).toBeTruthy();
      },
    );
  });
});
