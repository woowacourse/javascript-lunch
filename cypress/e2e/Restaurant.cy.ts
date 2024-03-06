import Restaurant from '../../src/domain/Restaurant';
import RestaurantValidator from '../../src/validator/RestaurantValidator';
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

  it('이름의 길이가 1자 미만 20자 초과이거나 이름이 공백으로만 이루어져 있으면 오류를 반환한다.', () => {
    // Assign
    const tooLongName = '이음식점은맛있지만음식점의이름이21글자임';
    const tooShortName = '';
    const onlyBlankName = '         ';

    // Assert
    expect(RestaurantValidator.validateRestaurantName(tooLongName)).to.throw(Error);
    expect(RestaurantValidator.validateRestaurantName(tooShortName)).to.throw(Error);
    expect(RestaurantValidator.validateRestaurantName(onlyBlankName)).to.throw(Error);
  });
});
