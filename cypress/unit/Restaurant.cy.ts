import Restaurant from '../../src/domain/Restaurant';
import { RestaurantDataType } from '../../src/type/restaurantDataType';
import { Category, DistanceByWalk } from '../../src/enum/enums';

describe('[Restaurant] 음식점 객체 테스트', () => {
  it('음식점은 자신의 카테고리, 이름, 거리, 설명, 참고 링크, 자주 가는 음식점 여부를 반환할 수 있다.', () => {
    const restaurantData: RestaurantDataType = {
      name: '한식당',
      category: Category.한식,
      distanceByWalk: DistanceByWalk['10분 내'],
      description: '한식당에 대한 설명',
      referenceUrl: 'https://naver.com',
      favorite: true,
    };

    const restaurant = new Restaurant(restaurantData);
    const expectedData = Object.entries(restaurant.getData()).toString();

    expect(expectedData).to.eql(Object.entries(restaurantData).toString());
  });

  it('음식점은 주어진 카테고리에 속하는지 여부를 반환할 수 있다.', () => {
    const restaurantData: RestaurantDataType = {
      name: '한식당',
      category: Category.한식,
      distanceByWalk: DistanceByWalk['10분 내'],
      description: '한식당에 대한 설명',
      referenceUrl: 'https://naver.com',
    };

    const restaurant = new Restaurant(restaurantData);
    const expectedResult = restaurant.isMatchedCategory(Category.한식);

    expect(expectedResult).to.eql(true);
  });

  it('음식점은 자신이 자주 가는 음식점에 속하는지 여부를 반환할 수 있다.', () => {
    const restaurantData: RestaurantDataType = {
      name: '한식당',
      category: Category.한식,
      distanceByWalk: DistanceByWalk['10분 내'],
      description: '한식당에 대한 설명',
      referenceUrl: 'https://naver.com',
      favorite: true,
    };

    const restaurant = new Restaurant(restaurantData);
    const expectedResult = restaurant.isFavorite();

    expect(expectedResult).to.eql(true);
  });

  it('음식점은 요청에 따라 자신에 대한 자주 가는 음식점 분류를 켜고 끌 수 있다.', () => {
    const restaurantData: RestaurantDataType = {
      name: '한식당',
      category: Category.한식,
      distanceByWalk: DistanceByWalk['10분 내'],
      description: '한식당에 대한 설명',
      referenceUrl: 'https://naver.com',
      favorite: false,
    };

    const restaurant = new Restaurant(restaurantData);
    restaurant.toggleFavorite();
    const expectedResultTrue = restaurant.isFavorite();

    restaurant.toggleFavorite();
    const expectedResultFalse = restaurant.isFavorite();

    expect(expectedResultTrue).to.eql(true);
    expect(expectedResultFalse).to.eql(false);
  });
});
