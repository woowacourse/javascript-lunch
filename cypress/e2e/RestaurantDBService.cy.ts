import RestaurantUpdateService from '@/domains/services/RestaurantUpdateService';
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

  it('새로운 음식점을 추가했을 때, 로컬 스토리지에 새로운 음식점이 추가된 음식점 목록이 가져와진다.', () => {
    const NEW_RESTAURANT1: IRestaurant = {
      id: 1,
      name: '친친',
      distance: 10,
      category: '중식',
      description: '게살볶음밥',
      isFavorite: false,
    };
    const NEW_RESTAURANT2: IRestaurant = {
      id: 2,
      name: '꺼벙이 김밥',
      distance: 10,
      category: '한식',
      description: '김밥 최저',
      isFavorite: false,
    };

    const restaurantUpdateService = new RestaurantUpdateService();

    restaurantUpdateService.updateAddedRestaurantCollection(NEW_RESTAURANT1);
    restaurantUpdateService.updateAddedRestaurantCollection(NEW_RESTAURANT2);

    expect(JSON.parse(localStorage.getItem(RESTAURANTS_DB_TEST_KEY) || '[]')).to.deep.equal([
      NEW_RESTAURANT1,
      NEW_RESTAURANT2,
    ]);
    expect(JSON.parse(localStorage.getItem(RESTAURANTS_DB_TEST_KEY) || '[]').length).to.equal(2);
  });

  it('RestaurantDBService의 get 메서드를 썼을 때 저장된 음식점 목록이 잘 가져와진다.', () => {
    const restaurantDBService = new RestaurantDBService();

    const RESTAURANT_FIRST: IRestaurant = {
      id: 1,
      name: '꺼벙이 김밥',
      distance: 10,
      category: '한식',
      description: '김밥 최저',
      isFavorite: false,
    };

    const RESTAURANT_SECOND: IRestaurant = {
      id: 2,
      name: '얌샘 김밥',
      distance: 5,
      category: '한식',
      description: '게살볶음밥',
      isFavorite: false,
    };

    localStorage.setItem(
      RESTAURANTS_DB_TEST_KEY,
      JSON.stringify([RESTAURANT_FIRST, RESTAURANT_SECOND]),
    );

    expect(JSON.parse(restaurantDBService.get() || '[]')).to.deep.equal([
      RESTAURANT_FIRST,
      RESTAURANT_SECOND,
    ]);
  });
});
