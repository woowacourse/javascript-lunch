import { CATEGORY, LOCAL_STORAGE_KEY, SORTING_CRITERION } from '../constants/constants';
import { Category, SortingCriterion, Restaurant } from '../types/types';

class RestaurantService {
  private restaurantList: Restaurant[];
  private currentCategory: Category = CATEGORY.ALL;
  private currentSortingCriterion: SortingCriterion = SORTING_CRITERION.NAME;

  constructor() {
    this.restaurantList = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY.RESTAURANTS) ?? '[]');
  }

  add(restaurant: Restaurant) {
    this.restaurantList.push(restaurant);
    localStorage.setItem(LOCAL_STORAGE_KEY.RESTAURANTS, JSON.stringify(this.restaurantList));
  }

  setCurrentCategory(category: Category) {
    this.currentCategory = category;
  }

  setCurrentSortingCriterion(criterion: SortingCriterion) {
    this.currentSortingCriterion = criterion;
  }

  filter() {
    if (this.currentCategory === CATEGORY.ALL) return [...this.restaurantList];

    return this.restaurantList.filter(restaurant => restaurant.category === this.currentCategory);
  }

  sortByName(restaurantList: Restaurant[]) {
    return [...restaurantList].sort((a, b) => a.name.localeCompare(b.name));
  }

  sortByDistance(restaurantList: Restaurant[]) {
    return [...restaurantList].sort((a, b) => a.distance - b.distance);
  }

  filterAndSort() {
    const filteredRestaurantList = this.filter();

    if (this.currentSortingCriterion === SORTING_CRITERION.NAME) {
      return this.sortByName(filteredRestaurantList);
    }

    return this.sortByDistance(filteredRestaurantList);
  }
}

export default RestaurantService;
