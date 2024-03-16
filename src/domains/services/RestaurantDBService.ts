import restaurantListMock from '@/mock/restaurantList.mock';
import RestaurantCollection from '../entities/RestaurantCollection';
import { RESTAURANTS_DB_KEY } from '@/constants/Condition';

class RestaurantDBService {
  constructor() {
    this.setMockData();
  }

  update() {
    const existingRestaurants = JSON.parse(this.get() || '[]');
    const restaurantCollection = new RestaurantCollection(existingRestaurants);
    restaurantCollection.filterDefault();
    return restaurantCollection;
  }

  get() {
    return localStorage.getItem(RESTAURANTS_DB_KEY);
  }

  set(collection: RestaurantCollection) {
    collection.filterDefault();
    localStorage.setItem(RESTAURANTS_DB_KEY, JSON.stringify(collection.get()));
  }

  setMockData() {
    if (!this.get()) {
      const mockRestaurantCollection = new RestaurantCollection(restaurantListMock);
      this.set(mockRestaurantCollection);
    }
  }
}

export default RestaurantDBService;
