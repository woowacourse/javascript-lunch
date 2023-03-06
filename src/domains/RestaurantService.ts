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

  filterBy(category: Category): Restaurant[] {
    if (category === CATEGORY.ALL) return [...this.restaurantList];

    return this.restaurantList.filter(restaurant => restaurant.category === category);
  }

  sortBy(criterion: SortingCriterion, restaurantList: Restaurant[]): Restaurant[] {
    if (criterion === SORTING_CRITERION.NAME) {
      return [...restaurantList].sort((a, b) => a.name.localeCompare(b.name));
    }

    return [...restaurantList].sort((a, b) => a.distance - b.distance);
  }

  filterAndSort(): Restaurant[] {
    const filteredRestaurantList = this.filterBy(this.currentCategory);
    return this.sortBy(this.currentSortingCriterion, filteredRestaurantList);
  }
}

export default RestaurantService;
