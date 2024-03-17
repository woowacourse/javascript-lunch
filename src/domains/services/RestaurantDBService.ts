import restaurantListMock from '@/mock/restaurantList.mock';
import RestaurantCollection from '../entities/RestaurantCollection';
import { RESTAURANTS_DB_KEY } from '@/constants/Condition';

class RestaurantDBService {
  update() {
    const existingRestaurants = this.get();
    const restaurantCollection = new RestaurantCollection(existingRestaurants);
    restaurantCollection.filterDefault();
    return restaurantCollection;
  }

  get() {
    return JSON.parse(localStorage.getItem(RESTAURANTS_DB_KEY) || '[]');
  }

  set(collection: RestaurantCollection) {
    collection.filterDefault();
    localStorage.setItem(RESTAURANTS_DB_KEY, JSON.stringify(collection.get()));
  }

  setMockData() {
    const mockRestaurantCollection = new RestaurantCollection(restaurantListMock);
    this.set(mockRestaurantCollection);
  }
}

export default RestaurantDBService;
