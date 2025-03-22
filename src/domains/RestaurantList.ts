import {
  CategoryType,
  AddRestaurantParams,
  FilterParams,
  RestaurantInfo,
  SortOptionsParams,
  SortResult,
  OrderType,
} from '../../types/restaurants.js';
import { RESTAURANT_CATEGORY_KEY, RESTAURANT_ORDER, RESTAURANT_TAB } from '../constants/SETTING.js';

class RestaurantList {
  #restaurants: RestaurantInfo[] = [];

  constructor(initialDatas: RestaurantInfo[] = []) {
    initialDatas.forEach((data) => this.#restaurants.push(data));
  }

  getOrderedRestaurantList(order: OrderType): RestaurantInfo[] {
    if (order === RESTAURANT_ORDER.NAME) {
      return [...this.#restaurants].sort((a, b) => a.name.localeCompare(b.name, 'ko-KR'));
    } else if (order === RESTAURANT_ORDER.DISTANCE) {
      return [...this.#restaurants].sort((a, b) => a.distance - b.distance);
    }

    return [...this.#restaurants];
  }

  filterFavorite(): RestaurantInfo[] {
    return [...this.#restaurants].filter((data) => data.isFavorite);
  }

  toggleFavorite({ id, tab, category, order }: FilterParams) {
    this.#restaurants = [...this.#restaurants].map((data) => {
      if (data.id === id) {
        return {
          ...data,
          isFavorite: !data.isFavorite,
        };
      }

      return data;
    });

    return this.sortByOptions({ tab, order, category });
  }

  deleteRestaurant({ id, tab, order, category }: FilterParams) {
    this.#restaurants = this.#restaurants.filter((data) => data.id !== id);
    return this.sortByOptions({ tab, order, category });
  }

  addRestaurant({ data, tab, order, category }: AddRestaurantParams) {
    this.#restaurants.push(data);
    return this.sortByOptions({ tab, order, category });
  }

  sortByOptions({ tab, order, category }: SortOptionsParams): SortResult {
    if (tab === RESTAURANT_TAB.ALL) {
      return {
        originalList: this.#restaurants,
        filteredList: this.filterRestaurant(category, order),
      };
    } else if (tab === RESTAURANT_TAB.FAVORITE) {
      return {
        originalList: this.#restaurants,
        filteredList: this.filterFavorite(),
      };
    }

    return {
      originalList: this.#restaurants,
      filteredList: this.#restaurants,
    };
  }

  filterRestaurant(category: CategoryType, order: OrderType): RestaurantInfo[] {
    let filteredRestaurants;

    if (category === '전체') {
      filteredRestaurants = [...this.#restaurants];
    } else {
      filteredRestaurants = this.#restaurants.filter(
        (data) =>
          data.category ===
          RESTAURANT_CATEGORY_KEY[category as keyof typeof RESTAURANT_CATEGORY_KEY]
      );
    }

    if (order === RESTAURANT_ORDER.NAME) {
      filteredRestaurants.sort((a, b) => a.name.localeCompare(b.name, 'ko-KR'));
    } else if (order === RESTAURANT_ORDER.DISTANCE) {
      filteredRestaurants.sort((a, b) => a.distance - b.distance);
    }

    return filteredRestaurants;
  }
}

export default RestaurantList;
