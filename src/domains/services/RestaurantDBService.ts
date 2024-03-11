import { CONDITIONS } from '@/constants/Condition';
import { Category, IRestaurant, SortCriteria } from '../../types/Restaurant';
import RestaurantCollection from '../entities/RestaurantCollection';
import restaurantListMock from '@/mock/restaurantList.mock';

class RestaurantDBService {
  #RESTAURANTS_DB_KEY = 'restaurants';
  #restaurantCollection = new RestaurantCollection([]);

  constructor() {
    this.#restaurantCollection;
    this.update();
    this.setMockData();
  }

  getFromRestaurantList(category: Category, sortCriteria: SortCriteria) {
    this.update();
    const restaurants = this.#restaurantCollection.filterByCategory(category);
    return new RestaurantCollection(restaurants).sort(sortCriteria);
  }

  update() {
    const existingRestaurants = JSON.parse(this.get() || '[]');
    this.#restaurantCollection = new RestaurantCollection(existingRestaurants);
  }

  get() {
    return localStorage.getItem(this.#RESTAURANTS_DB_KEY);
  }

  set(data: IRestaurant[]) {
    localStorage.setItem(this.#RESTAURANTS_DB_KEY, JSON.stringify(data));
  }

  setMockData() {
    if (!this.get()) {
      this.set(restaurantListMock);
    }
  }

  add(restaurant: IRestaurant) {
    this.update();
    this.#restaurantCollection.addRestaurant(restaurant);
    localStorage.setItem(
      this.#RESTAURANTS_DB_KEY,
      JSON.stringify(this.#restaurantCollection.get()),
    );
  }
}

export default RestaurantDBService;
