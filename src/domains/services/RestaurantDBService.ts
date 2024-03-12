import restaurantListMock from '@/mock/restaurantList.mock';
import type { Category, IRestaurant, SortCriteria } from '../../types/Restaurant';
import RestaurantCollection from '../entities/RestaurantCollection';

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

  getFavorite() {
    this.update();
    const restaurants = this.#restaurantCollection.filterFavorites();
    return new RestaurantCollection(restaurants);
  }

  update() {
    const existingRestaurants = JSON.parse(this.get() || '[]');
    this.#restaurantCollection.set(existingRestaurants);

    return this.#restaurantCollection;
  }

  get() {
    return localStorage.getItem(this.#RESTAURANTS_DB_KEY);
  }

  setCollection(collection: RestaurantCollection) {
    localStorage.setItem(this.#RESTAURANTS_DB_KEY, JSON.stringify(collection.get()));
  }

  set(data: IRestaurant[]) {
    localStorage.setItem(this.#RESTAURANTS_DB_KEY, JSON.stringify(data));
  }

  setMockData() {
    if (!this.get()) {
      this.set(restaurantListMock);
    }
  }
}

export default RestaurantDBService;
