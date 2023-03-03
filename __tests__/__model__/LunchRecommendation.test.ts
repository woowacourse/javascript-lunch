import {
  Restaurant,
  RestaurantInfo,
  LunchRecommendation,
} from '../../src/domain/model/LunchRecommendation';

type RequiredInfo = Pick<RestaurantInfo, 'id' | 'name' | 'category' | 'distance'>;
const getDummyInfo = (requiredInfo: RequiredInfo) => {
  return {
    ...requiredInfo,
    description: 'Since 2004 편리한 교통',
    link: 'https://chinchin.com',
  };
};

describe('주어진 정보로 생성된 음식점 모델 테스트', () => {
  let restaurant: Restaurant;
  let lunchRecommendation: LunchRecommendation;
  let correctInfo: RestaurantInfo;
  let requiredInfoList: RequiredInfo[];
  let restaurantList: Restaurant[];

  beforeEach(() => {
    requiredInfoList = [
      { id: 0, category: '한식', name: '가', distance: 1 },
      { id: 1, category: '중식', name: '나', distance: 2 },
      { id: 2, category: '일식', name: '다', distance: 4 },
      { id: 3, category: '한식', name: '라', distance: 3 },
      { id: 4, category: '기타', name: '마', distance: 5 },
    ];

    restaurantList = requiredInfoList.map(
      (requiredInfo) => new Restaurant(getDummyInfo(requiredInfo))
    );

    correctInfo = getDummyInfo({ id: 999, category: '한식', name: '친친친', distance: 100 });
    lunchRecommendation = new LunchRecommendation(requiredInfoList.map(getDummyInfo));
    restaurant = new Restaurant(correctInfo);
  });

  test('음식점은 카테고리, 이름, 거리정보를 필수로 가져야 한다', () => {
    expect(() => {
      new Restaurant({} as RestaurantInfo);
    }).toThrow();

    expect(restaurant.info).toEqual(correctInfo);
  });

  test('음식점의 특정 정보를 조회할 수 있다', () => {
    expect(restaurant.getSomeInfo('name')).toBe(correctInfo.name);
    expect(restaurant.getSomeInfo('category')).toBe(correctInfo.category);
  });

  test('음식점은 설명, 참고 링크 정보를 옵션으로 가질 수 있다', () => {
    expect(restaurant.info).toEqual(correctInfo);
  });

  test.skip('음식점 목록에 음식점 추가를 할 수 있다', () => {
    lunchRecommendation.add(correctInfo);

    expect(lunchRecommendation.getList().length).toBe(6);
  });

  test('음식점 목록을 카테고리에 따라 필터링이 가능하다', () => {
    const filteredRestaurants = lunchRecommendation.filterByCategory(restaurantList, '한식');

    filteredRestaurants.forEach((restaurant) => {
      expect(restaurant.getSomeInfo('category')).toBe('한식');
    });
  });

  test('음식점 목록은 이름에 따라 정렬이 가능하다', () => {
    const sortedRestaurants = lunchRecommendation
      .sortByName(restaurantList)
      .map((restaurant) => restaurant.getSomeInfo('name'));

    expect(sortedRestaurants).toEqual(['가', '나', '다', '라', '마']);
  });

  test('음식점 목록은 거리에 따라 정렬이 가능하다', () => {
    const sortedRestaurants = lunchRecommendation
      .sortByDistance(restaurantList)
      .map((restaurant) => restaurant.getSomeInfo('distance'));

    expect(sortedRestaurants).toEqual([1, 2, 3, 4, 5]);
  });

  test('음식점 목록에서 음식점을 제거할 수 있다', () => {
    expect(lunchRecommendation.delete(3)).toEqual(
      restaurantList.filter((info) => info.getSomeInfo('id') !== 3)
    );
  });
});
