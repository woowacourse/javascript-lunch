import RestaurantService from '../../src/service/RestaurantService';
import defaultRestaurant from '../../src/data/defaultRestaurants.json';

import type { RestaurantDataType } from '../../src/type/restaurantDataType';
import { Category, DistanceByWalk, SortOrder } from '../../src/enum/enums';

describe('[RestaurantService] 음식점 서비스 객체 테스트', () => {
  it('getRestaurants() 메서드는 전체 음식점 목록 크기만큼의 음식점들을 반환해야 한다.', () => {
    const restaurantService = new RestaurantService();

    const expectedData = restaurantService.getRestaurants(SortOrder.이름순);

    expect(expectedData.length).to.eql(defaultRestaurant.length);
  });

  it('getRestaurants() 메서드에 isFavoriteList가 true라면 자주 가는 음식점 목록의 전체 크기만큼의 음식점들을 반환해야 한다.', () => {
    const restaurantService = new RestaurantService();

    const expectedData = restaurantService.getRestaurants(SortOrder.이름순, undefined, true);

    const expectedFavoriteRestaurantCount = defaultRestaurant.filter((restaurant) => restaurant.favorite).length;
    expect(expectedData.length).to.eql(expectedFavoriteRestaurantCount);
  });

  it('addRestaurant() 메서드는 입력 받은 음식점 정보를 전체 음식점 목록에 추가해야 한다.', () => {
    const restaurantService = new RestaurantService();
    const restaurantName = '한식당';
    const restaurantData: RestaurantDataType = {
      name: restaurantName,
      category: Category.한식,
      distanceByWalk: DistanceByWalk['10분 내'],
      description: '한식당에 대한 설명',
      referenceUrl: 'https://naver.com',
    };

    restaurantService.addRestaurant(restaurantData);
    const expectedData = restaurantService
      .getRestaurants(SortOrder.이름순)
      .filter((restaurant) => restaurant.name === restaurantName);

    expect(expectedData.length).to.eql(1);
  });
});