import restaurantListMock from '@/mock/restaurantList.mock';
import RestaurantCollection from '../entities/RestaurantCollection';

class RestaurantDBService {
  #RESTAURANTS_DB_KEY = 'restaurants';

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
    return localStorage.getItem(this.#RESTAURANTS_DB_KEY);
  }

  set(collection: RestaurantCollection) {
    collection.filterDefault();
    localStorage.setItem(this.#RESTAURANTS_DB_KEY, JSON.stringify(collection.get()));
  }

  setMockData() {
    if (!this.get()) {
      const mockRestaurantCollection = new RestaurantCollection(restaurantListMock);
      this.set(mockRestaurantCollection);
    }
  }
}

export default RestaurantDBService;
