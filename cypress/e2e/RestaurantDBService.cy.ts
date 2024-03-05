import RestaurantDBService from '../../src/domains/services/RestaurantDBService';
import { IRestaurant } from '../../src/types/Restaurant';

describe('음식점 DB 서비스 테스트', () => {
  const RESTAURANTS_DB_TEST_KEY = 'restaurants_test';

  before(() => {
    let restaurants: IRestaurant[] = [];
    cy.stub(localStorage, 'getItem', (key) => JSON.stringify(restaurants));
    cy.stub(localStorage, 'setItem', (key, restaurantJSON) => {
      restaurants = JSON.parse(restaurantJSON);
    });
  });

  beforeEach(() => {
    localStorage.removeItem(RESTAURANTS_DB_TEST_KEY);
  });

  it('새로운 음식점을 추가했을 때, 로컬 스토리지에 잘 반영된다.', () => {
    const restaurantDBService = new RestaurantDBService();

    const NEW_RESTAURANT: IRestaurant = {
      name: '친친',
      distance: 10,
      category: '중식',
      description: '게살볶음밥',
    };

    restaurantDBService.add(NEW_RESTAURANT);

    expect(JSON.parse(localStorage.getItem(RESTAURANTS_DB_TEST_KEY) || '[]')).to.deep.equal([
      NEW_RESTAURANT,
    ]);
  });
});
