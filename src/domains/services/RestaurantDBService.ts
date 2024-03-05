import { IRestaurant } from '../../types/Restaurant';
import RestaurantList from '../entities/RestaurantList';

class RestaurantDBService {
  #RESTAURANTS_DB_KEY = 'restaurants';
  #restaurantList;

  constructor() {
    const existingRestuarants = JSON.parse(this.getRestuarantListFromDB() || '[]');
    this.#restaurantList = new RestaurantList(existingRestuarants);
  }

  getRestuarantListFromDB() {
    return localStorage.getItem(this.#RESTAURANTS_DB_KEY);
  }

  add(restaurant: IRestaurant) {
    this.#restaurantList.addRestaurant(restaurant);
    localStorage.setItem(this.#RESTAURANTS_DB_KEY, JSON.stringify(this.#restaurantList.get()));
  }
}

export default RestaurantDBService;
