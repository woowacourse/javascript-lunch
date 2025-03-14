import RestaurantList from '../domains/RestaurantList.js';
import RestaurantStorage from '../domains/RestaurantStorage.js';

class RestaurantService {
  #restaurantList = null;
  #restaurantStorage = null;

  constructor() {
    this.#restaurantStorage = new RestaurantStorage();
    this.#restaurantList = new RestaurantList(this.#restaurantStorage.getAllRestaurants());
  }

  getOrderedRestaurants(order) {
    return this.#restaurantList.getOrderedRestaurantList(order);
  }

  getFilteredRestaurants(category, order) {
    return this.#restaurantList.filterRestaurant(category, order);
  }

  getFavoriteRestaurants() {
    return this.#restaurantList.filterFavorite();
  }

  toggleFavorite({ id, tab, category, order }) {
    const result = this.#restaurantList.toggleFavorite({
      id,
      tab,
      category,
      order,
    });

    this.#restaurantStorage.updateStorage(result.originalList);
    return result;
  }

  addRestaurant({ data, tab, category, order }) {
    const result = this.#restaurantList.addRestaurant({
      data,
      tab,
      order,
      category,
    });

    this.#restaurantStorage.updateStorage(result.originalList);
    return result;
  }

  deleteRestaurant({ id, tab, category, order }) {
    const result = this.#restaurantList.deleteRestaurant({
      id,
      tab,
      order,
      category,
    });

    this.#restaurantStorage.updateStorage(result.originalList);
    return result;
  }
}

export default RestaurantService;
