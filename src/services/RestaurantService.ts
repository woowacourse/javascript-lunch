import {
  CategoryType,
  AddRestaurantParams,
  FilterParams,
  RestaurantInfo,
  SortResult,
  OrderType,
} from '../../types/restaurants.js';
import RestaurantList from '../domains/RestaurantList.js';
import RestaurantStorage from '../domains/RestaurantStorage.js';

class RestaurantService {
  #restaurantList: RestaurantList;
  #restaurantStorage: RestaurantStorage;

  constructor() {
    this.#restaurantStorage = new RestaurantStorage();
    this.#restaurantList = new RestaurantList(this.#restaurantStorage.getAllRestaurants());
  }

  getOrderedRestaurants(order: OrderType): RestaurantInfo[] {
    return this.#restaurantList.getOrderedRestaurantList(order);
  }

  getFilteredRestaurants(category: CategoryType, order: OrderType): RestaurantInfo[] {
    return this.#restaurantList.filterRestaurant(category, order);
  }

  getFavoriteRestaurants(): RestaurantInfo[] {
    return this.#restaurantList.filterFavorite();
  }

  toggleFavorite({ id, tab, category, order }: FilterParams): SortResult {
    const result = this.#restaurantList.toggleFavorite({
      id,
      tab,
      category,
      order,
    });

    this.#restaurantStorage.updateStorage(result.originalList);
    return result;
  }

  addRestaurant({ data, tab, category, order }: AddRestaurantParams): SortResult {
    const result = this.#restaurantList.addRestaurant({
      data,
      tab,
      order,
      category,
    });

    this.#restaurantStorage.updateStorage(result.originalList);
    return result;
  }

  deleteRestaurant({ id, tab, category, order }: FilterParams): SortResult {
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
