import { CONDITIONS } from '@/constants/Condition';
import { Category, IRestaurant } from '../../types/Restaurant';
import RestaurantCollection from '../entities/RestaurantCollection';
import restaurantListMock from '@/mock/restaurantList.mock';

class RestaurantDBService {
  #RESTAURANTS_DB_KEY = 'restaurants';
  #restaurantCollection;

  constructor() {
    const existingRestaurants = JSON.parse(this.get() || '[]');
    this.#restaurantCollection = new RestaurantCollection(existingRestaurants);
    this.set(restaurantListMock);
  }

  getFromRestaurantList(category: Category, sortCriteria: keyof typeof CONDITIONS.SORT_CRITERION) {
    const restaurants = this.#restaurantCollection.filterByCategory(category);
    return new RestaurantCollection(restaurants).sort(sortCriteria);
  }

  get() {
    return localStorage.getItem(this.#RESTAURANTS_DB_KEY);
  }

  set(data: IRestaurant[]) {
    localStorage.setItem(this.#RESTAURANTS_DB_KEY, JSON.stringify(data));
  }

  add(restaurant: IRestaurant) {
    this.#restaurantCollection.addRestaurant(restaurant);
    localStorage.setItem(
      this.#RESTAURANTS_DB_KEY,
      JSON.stringify(this.#restaurantCollection.get()),
    );
  }
}

export default RestaurantDBService;
