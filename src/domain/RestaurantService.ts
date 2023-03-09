import { CategoryOptions, FilterOptions } from '../types/type';
import { IRestaurant, Restaurant } from './Restaurant';

export default class RestaurantService {
  #restaurants: Restaurant[];

  constructor(restaurants: Restaurant[] = []) {
    this.#restaurants = restaurants;
  }

  getRestaurantsInfo() {
    return [...this.#restaurants];
  }

  filterByCategory(restaurants: Restaurant[], category: CategoryOptions) {
    if (category === '전체') {
      return this.getRestaurantsInfo();
    }

    const filteredByCategory = restaurants.filter((restaurant) =>
      restaurant.isSameCategory(category)
    );

    return filteredByCategory;
  }

  sortByName(restaurants: Restaurant[]) {
    const nameSortedRestaurants = [...restaurants].sort((a, b) => {
      if (a.compareName(b) === 0) return a.compareDistance(b);

      return a.compareName(b);
    });

    return nameSortedRestaurants;
  }

  sortByDistance(restaurants: Restaurant[]) {
    const distanceSortedRestaurants = [...restaurants].sort((a, b) => {
      if (a.compareDistance(b) === 0) return a.compareName(b);

      return a.compareDistance(b);
    });

    return distanceSortedRestaurants;
  }

  addRestaurant(restaurant: IRestaurant) {
    this.#restaurants = [
      ...this.#restaurants,
      new Restaurant({ ...restaurant }),
    ];
  }

  getSortedList(filter: FilterOptions, filteredList: Restaurant[]) {
    const { sortByName, sortByDistance } = this;

    switch (filter) {
      case '이름순':
        return sortByName(filteredList);
      case '거리순':
        return sortByDistance(filteredList);
      default:
        return [];
    }
  }

  getFilteredAndSortedList(category: CategoryOptions, filter: FilterOptions) {
    const wholeList = this.getRestaurantsInfo();

    const filteredList = this.filterByCategory(wholeList, category);

    const filteredAndSortedList = this.getSortedList(filter, filteredList);

    return filteredAndSortedList;
  }

  deleteRerstaurant(id: number) {
    this.#restaurants = [...this.#restaurants].filter(
      (restaurant) => restaurant.getRestaurantInfo()['id'] !== id
    );
  }

  getFilterdFavoriteList() {
    return [...this.#restaurants].filter((restaurant) =>
      restaurant.getFavoriteState()
    );
  }

  getWholeRestaurantList() {
    return [...this.getRestaurantsInfo()].map((restaurant) =>
      restaurant.getRestaurantInfo()
    );
  }
}
