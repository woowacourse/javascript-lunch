import { CONDITIONS } from '@/constants/Condition';
import { Category, IRestaurant } from '../../types/Restaurant';
import RestaurantCollection from '../entities/RestaurantCollection';
import restaurantListMock from '@/mock/restaurantList.mock';

class RestaurantDBService {
  #RESTAURANTS_DB_KEY = 'restaurants';
  #restaurantList;

  constructor() {
    const existingRestaurants = JSON.parse(this.get() || '[]');
    this.#restaurantList = new RestaurantCollection(existingRestaurants);
    this.set(restaurantListMock);
  }

  getFromRestaurantList(category: Category, sortCriteria: keyof typeof CONDITIONS.SORT_CRITERION) {
    const restaurants = this.#restaurantList.filterByCategory(category);
    return new RestaurantCollection(restaurants).sort(sortCriteria);
  }

  get() {
    return localStorage.getItem(this.#RESTAURANTS_DB_KEY);
  }

  set(data: IRestaurant[]) {
    localStorage.setItem(this.#RESTAURANTS_DB_KEY, JSON.stringify(data));
  }

  add(restaurant: IRestaurant) {
    this.#restaurantList.addRestaurant(restaurant);
    localStorage.setItem(this.#RESTAURANTS_DB_KEY, JSON.stringify(this.#restaurantList.get()));
  }
}

export default RestaurantDBService;
