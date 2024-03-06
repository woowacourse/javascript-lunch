import Restaurant from '../../src/domain/Restaurant';
import { IRestaurant } from '../../src/interface/Interface';

describe('[Restaurant] 음식점 객체 테스트', () => {
  it('음식점은 자신의 카테고리, 이름, 거리, 설명, 참고 링크를 반환할 수 있다.', () => {
    // Assign
    const restaurantObject: IRestaurant = {
      name: '한식당',
      category: '한식',
      minutesWalk: 10,
      description: '한식당에 대한 설명',
      referenceUrl: 'https://naver.com',
    };

    // Action
    const restaurant = new Restaurant(restaurantObject);
    const expectedData = Object.entries(restaurant.getData()).toString();

    // Assert
    expect(expectedData).to.eql(Object.entries(restaurantObject).toString());
  });

  it('음식점은 주어진 카테고리에 속하는지 여부를 반환할 수 있다.', () => {
    // Assign
    const restaurantObject: IRestaurant = {
      name: '한식당',
      category: '한식',
      minutesWalk: 15,
      description: '한식당에 대한 설명',
      referenceUrl: 'https://naver.com',
    };

    // Action
    const restaurant = new Restaurant(restaurantObject);
    const expectedResult = restaurant.isMatchedCategory('한식');

    // Assert
    expect(expectedResult).to.eql(true);
  });
});
