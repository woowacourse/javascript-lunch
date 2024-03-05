import { IRestaurant } from '../../src/types/Restaurant';
import RestaurantList from '../../src/domains/entities/RestaurantList';

class RestaurantDBService {
  #RESTAURANTS_DB_KEY = 'restaurants';
  #restaurantList;

  constructor() {
    const existingRestuarants = JSON.parse(this.getRestuarantListFromDB() || '[]');
    this.#restaurantList = new RestaurantList(existingRestuarants);
  }

  getRestuarantListFromDB() {
    return localStorage.getItem(this.#RESTAURANTS_DB_KEY);
  }

  add(restaurant: IRestaurant) {
    this.#restaurantList.addRestaurant(restaurant);
    localStorage.setItem(this.#RESTAURANTS_DB_KEY, JSON.stringify(this.#restaurantList.get()));
  }
}

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
