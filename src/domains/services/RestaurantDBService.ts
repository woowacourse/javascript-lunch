import { CONDITIONS } from '@/constants/Condition';
import { IRestaurant } from '../../types/Restaurant';
import RestaurantCollection from '../entities/RestaurantCollection';

class RestaurantDBService {
  #RESTAURANTS_DB_KEY = 'restaurants';
  #restaurantList;

  constructor() {
    const existingRestaurants = JSON.parse(this.get() || '[]');
    this.#restaurantList = new RestaurantCollection(existingRestaurants);
  }

  getFromRestuarList() {
    const restaurants = this.#restaurantList.filterByCategory('거리');
    const list2 = new RestaurantCollection(restaurants);
    return list2.sortByDistance();
  }

  get() {
    return localStorage.getItem(this.#RESTAURANTS_DB_KEY);
  }

  add(restaurant: IRestaurant) {
    this.#restaurantList.addRestaurant(restaurant);
    localStorage.setItem(this.#RESTAURANTS_DB_KEY, JSON.stringify(this.#restaurantList.get()));
  }

  sort(sortCriteria: keyof typeof CONDITIONS.SORT_CRITERION) {
    if (sortCriteria === '이름순') return this.#restaurantList.sortByName();
    return this.#restaurantList.sortByDistance();
  }
}

export default RestaurantDBService;
