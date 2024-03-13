import RestaurantDBService from '../../src/domains/services/RestaurantDBService';
import { IRestaurant } from '../../src/types/Restaurant';

describe('음식점 DB 서비스 테스트', () => {
  const RESTAURANTS_DB_TEST_KEY = 'restaurants_test';

  let restaurants: IRestaurant[] = [];

  beforeEach(() => {
    cy.stub(localStorage, 'getItem', () => JSON.stringify(restaurants));
    cy.stub(localStorage, 'setItem', (_, restaurantJSON) => {
      restaurants = JSON.parse(restaurantJSON);
    });
    cy.stub(localStorage, 'removeItem', () => {
      restaurants = JSON.parse('[]');
    });
  });

  it('새로운 음식점을 추가했을 때, DB에 반영한다.', () => {
    const NEW_RESTAURANT: IRestaurant = {
      name: '친친',
      distance: 10,
      category: '중식',
      description: '게살볶음밥',
    };
    const restaurantDBService = new RestaurantDBService();

    restaurantDBService.add(NEW_RESTAURANT);

    expect(restaurantDBService.get() ?? '[]').to.deep.equal([NEW_RESTAURANT]);
  });

  it('get했을 때, DB로부터 데이터를 가져온다.', () => {
    const restaurantDBService = new RestaurantDBService();
    const RESTAURANT_FIRST: IRestaurant = {
      name: '꺼벙이 김밥',
      distance: 10,
      category: '한식',
      description: '김밥 취저',
    };

    const RESTAURANT_SECOND: IRestaurant = {
      name: '얌샘 김밥',
      distance: 5,
      category: '한식',
      description: '게살볶음밥',
    };

    localStorage.setItem(
      RESTAURANTS_DB_TEST_KEY,
      JSON.stringify([RESTAURANT_FIRST, RESTAURANT_SECOND]),
    );

    expect(restaurantDBService.get()).to.deep.equal([RESTAURANT_FIRST, RESTAURANT_SECOND]);
  });
});
