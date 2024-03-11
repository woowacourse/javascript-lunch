import {
  Restaurant,
  Category,
  WalkingTime,
} from '../../src/interface/Restaurant';
import { RestaurantManager } from '../../src/domain/RestaurantManager';
import {
  RestaurantData,
  addition,
  filterTests,
  sortingName,
  sortingWalkingTime,
} from '../support/e2e';

describe('음식점 목록 테스트', () => {
  it('음식점을 추가하면 정상적으로 추가되었는지 확인한다.', () => {
    // given
    const newRestaurant: RestaurantData = addition.input[0];

    const restaurantManager = new RestaurantManager([]);

    // when
    restaurantManager.add(addition.output[0]);

    // then
    expect(restaurantManager.getRestaurants()).to.eql([newRestaurant]);
  });

  it('음식점을 이름순으로 정렬해 반환한다.', () => {
    // given
    const localStorageRestaurants: Restaurant[] = sortingName.input;
    console.log(localStorageRestaurants);
    const restaurantManager: RestaurantManager = new RestaurantManager(
      localStorageRestaurants
    );
    const sortedByAscendingName: RestaurantData[] = sortingName.output;
    // then
    expect(restaurantManager.sortByAscendingName()).to.eql(
      sortedByAscendingName
    );
  });

  it('음식점을 거리순으로 정렬해 반환한다.', () => {
    // given
    const localStorageRestaurants: Restaurant[] = sortingWalkingTime.input;
    const restaurantManager: RestaurantManager = new RestaurantManager(
      localStorageRestaurants
    );
    const sortedByAscendingWalkingTime: Restaurant[] =
      sortingWalkingTime.output;

    // then
    expect(restaurantManager.sortByAscendingWalkingTime()).to.eql(
      sortedByAscendingWalkingTime
    );
  });

  it('입력받은 카테고리로 필터링된 메뉴 목록 반환한다.', () => {
    // given
    const newRestaurant: Restaurant = {
      category: '중식',
      name: '친친',
      walkingTime: 5,
    };

    const restaurantManager: RestaurantManager = new RestaurantManager([]);

    // when
    restaurantManager.add(newRestaurant);

    // then
    expect(restaurantManager.getRestaurants()).to.eql([newRestaurant]);
  });

  const totalRestaurants: Restaurant[] = filterTests.output;

  const testData: { category: Category; filteredRestaurants: Restaurant[] }[] =
    filterTests.input;

  testData.forEach(({ category, filteredRestaurants }) => {
    it(`${category}로 정렬한 결과를 받아온다.`, () => {
      // given
      const restaurantManager: RestaurantManager = new RestaurantManager(
        totalRestaurants
      );
      restaurantManager.udateCurentCategoty(category);

      // then
      expect(restaurantManager.filteredRestaurants()).to.eql(
        filteredRestaurants
      );
    });
  });
});
