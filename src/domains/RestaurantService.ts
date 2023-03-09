import { CATEGORY, SORTING_CRITERION } from '../constants/constants';
import { FAVORITE_ICON_IMAGE } from '../constants/images';
import { Category, SortingCriterion, Restaurant } from '../types/types';

class RestaurantService {
  private restaurantList: Restaurant[];
  private currentCategory: Category = CATEGORY.ALL;
  private currentSortingCriterion: SortingCriterion = SORTING_CRITERION.NAME;

  constructor() {
    this.restaurantList = this.getRestaurantList();
  }

  getRestaurantList() {
    const restaurantList = Object.keys(localStorage).map((key) => {
      const restaurantItem = localStorage.getItem(key);
      if (restaurantItem) return JSON.parse(restaurantItem);
    });

    if (restaurantList.length > 0) return restaurantList;
    return [];
  }

  add(restaurant: Restaurant) {
    restaurant.favoriteImageUrl = FAVORITE_ICON_IMAGE.LINED; // 즐겨찾기 아이콘 기본 경로 설정
    this.restaurantList.push(restaurant);
    localStorage.setItem(restaurant.name, JSON.stringify(restaurant));
  }

  setCurrentCategory(category: Category) {
    this.currentCategory = category;
  }

  setCurrentSortingCriterion(criterion: SortingCriterion) {
    this.currentSortingCriterion = criterion;
  }

  filterBy(category: Category): Restaurant[] {
    if (category === CATEGORY.ALL) return [...this.restaurantList];

    return this.restaurantList.filter((restaurant) => restaurant.category === category);
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
