import {
  CategoryType,
  IAddRestaurantParams,
  IFilterParams,
  IRestaurantInfo,
  ISortOptionsParams,
  ISortResult,
  OrderType,
} from '../../types/restaurants.js';
import { CATEGORY_KEY, ORDER, TAB } from '../constants/SETTING.js';

class RestaurantList {
  #restaurants: IRestaurantInfo[] = [];

  constructor(initialDatas: IRestaurantInfo[] = []) {
    initialDatas.forEach((data) => this.#restaurants.push(data));
  }

  getOrderedRestaurantList(order: OrderType): IRestaurantInfo[] {
    if (order === ORDER.NAME) {
      return [...this.#restaurants].sort((a, b) => a.name.localeCompare(b.name, 'ko-KR'));
    } else if (order === ORDER.DISTANCE) {
      return [...this.#restaurants].sort((a, b) => a.distance - b.distance);
    }

    return [...this.#restaurants];
  }

  filterFavorite(): IRestaurantInfo[] {
    return [...this.#restaurants].filter((data) => data.isFavorite);
  }

  toggleFavorite({ id, tab, category, order }: IFilterParams) {
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

  deleteRestaurant({ id, tab, order, category }: IFilterParams) {
    this.#restaurants = this.#restaurants.filter((data) => data.id !== id);
    return this.sortByOptions({ tab, order, category });
  }

  addRestaurant({ data, tab, order, category }: IAddRestaurantParams) {
    this.#restaurants.push(data);
    return this.sortByOptions({ tab, order, category });
  }

  sortByOptions({ tab, order, category }: ISortOptionsParams): ISortResult {
    if (tab === TAB.ALL) {
      return {
        originalList: this.#restaurants,
        filteredList: this.filterRestaurant(category, order),
      };
    } else if (tab === TAB.FAVORITE) {
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

  filterRestaurant(category: CategoryType, order: OrderType): IRestaurantInfo[] {
    let filteredRestaurants;

    if (category === '전체') {
      filteredRestaurants = [...this.#restaurants];
    } else {
      filteredRestaurants = this.#restaurants.filter(
        (data) => data.category === CATEGORY_KEY[category as keyof typeof CATEGORY_KEY]
      );
    }

    if (order === ORDER.NAME) {
      filteredRestaurants.sort((a, b) => a.name.localeCompare(b.name, 'ko-KR'));
    } else if (order === ORDER.DISTANCE) {
      filteredRestaurants.sort((a, b) => a.distance - b.distance);
    }

    return filteredRestaurants;
  }
}

export default RestaurantList;
