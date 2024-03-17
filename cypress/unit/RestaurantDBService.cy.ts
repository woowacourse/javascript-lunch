import RestaurantUpdateService from '@/domains/services/RestaurantUpdateService';
import RestaurantDBService from '../../src/domains/services/RestaurantDBService';
import { IRestaurant } from '../../src/types/Restaurant';
import restaurantListMock from '@/mock/restaurantList.mock';
import RestaurantCollection from '@/domains/entities/RestaurantCollection';
describe('음식점 업데이트 테스트 서비스', () => {
  it('새로운 음식점을 추가했을 때, 로컬 스토리지에 새로운 음식점이 추가된 음식점 목록이 가져와진다.', () => {
    const NEW_RESTAURANT1: IRestaurant = {
      id: 1,
      name: '리안네 볶음밥',
      distance: 10,
      category: '중식',
      description: '게살볶음밥',
      isFavorite: false,
    };

    const restaurantUpdateService = new RestaurantUpdateService();
    const restaurantDBService = new RestaurantDBService();
    restaurantUpdateService.updateAddedRestaurantCollection(NEW_RESTAURANT1);

    expect(restaurantDBService.update().get().length).to.equal(restaurantListMock.length + 1);
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

    restaurantDBService.set(new RestaurantCollection([RESTAURANT_FIRST, RESTAURANT_SECOND]));
    expect(JSON.parse(restaurantDBService.get() || '[]')).to.deep.equal([
      RESTAURANT_FIRST,
      RESTAURANT_SECOND,
    ]);
  });
});
