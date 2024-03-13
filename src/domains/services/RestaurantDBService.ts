import restaurantListMock from '@/mock/restaurantList.mock';
import type { IRestaurant } from '../../types/Restaurant';
import RestaurantCollection from '../entities/RestaurantCollection';

class RestaurantDBService {
  #RESTAURANTS_DB_KEY = 'restaurants';

  constructor() {
    this.update();
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

  setCollection(collection: RestaurantCollection) {
    collection.filterDefault();
    localStorage.setItem(this.#RESTAURANTS_DB_KEY, JSON.stringify(collection.get()));
  }

  set(data: IRestaurant[]) {
    localStorage.setItem(this.#RESTAURANTS_DB_KEY, JSON.stringify(data));
  }

  setMockData() {
    if (!this.get()) {
      const mockRestaurantCollection = new RestaurantCollection(restaurantListMock);
      mockRestaurantCollection.filterDefault();

      return this.set(mockRestaurantCollection.get());
    }
  }
}

export default RestaurantDBService;
