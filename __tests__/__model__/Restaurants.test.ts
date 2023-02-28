import { Category, Restaurant, RestaurantInfo, Restaurants } from '../../domain/Restaurants';

const getDummyInfo = (category: Category) => {
  return {
    name: '친친',
    category,
    distance: 0,
    description: 'Since 2004 편리한 교통',
    link: 'https://chinchin.com',
  };
};

describe('주어진 정보로 생성된 음식점 모델 테스트', () => {
  let restaurant: Restaurant;
  let restaurants: Restaurants;
  let correctInfo: RestaurantInfo;

  beforeEach(() => {
    correctInfo = getDummyInfo('한식');
    restaurant = new Restaurant(correctInfo);
  });
  test('음식점은 카테고리, 이름, 거리정보를 필수로 가져야 한다', () => {
    expect(() => {
      new Restaurant({} as RestaurantInfo);
    }).toThrow();

    expect(restaurant.getInfo()).toEqual(correctInfo);
  });

  test('음식점의 특정 정보를 조회할 수 있다', () => {
    expect(restaurant.getSomeInfo('name')).toBe(correctInfo.name);
    expect(restaurant.getSomeInfo('category')).toBe(correctInfo.category);
  });

  test('음식점은 설명, 참고 링크 정보를 옵션으로 가질 수 있다', () => {
    expect(restaurant.getInfo()).toEqual(correctInfo);
  });

  test('음식점 목록에 음식점 추가를 할 수 있다', () => {
    restaurants.add(restaurant);

    expect(restaurants.getList().length).toBe(6);
  });
});
