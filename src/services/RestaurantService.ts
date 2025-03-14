import {
  CategoryType,
  IAddRestaurantParams,
  IFilterParams,
  IRestaurantInfo,
  ISortResult,
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

  getOrderedRestaurants(order: OrderType): IRestaurantInfo[] {
    return this.#restaurantList.getOrderedRestaurantList(order);
  }

  getFilteredRestaurants(category: CategoryType, order: OrderType): IRestaurantInfo[] {
    return this.#restaurantList.filterRestaurant(category, order);
  }

  getFavoriteRestaurants(): IRestaurantInfo[] {
    return this.#restaurantList.filterFavorite();
  }

  toggleFavorite({ id, tab, category, order }: IFilterParams): ISortResult {
    const result = this.#restaurantList.toggleFavorite({
      id,
      tab,
      category,
      order,
    });

    this.#restaurantStorage.updateStorage(result.originalList);
    return result;
  }

  addRestaurant({ data, tab, category, order }: IAddRestaurantParams): ISortResult {
    const result = this.#restaurantList.addRestaurant({
      data,
      tab,
      order,
      category,
    });

    this.#restaurantStorage.updateStorage(result.originalList);
    return result;
  }

  deleteRestaurant({ id, tab, category, order }: IFilterParams): ISortResult {
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
