import { CATEGORY, SORTING_CRITERION } from '../constants/constants';
import { FAVORITE_ICON_IMAGE } from '../constants/images';
import { Category, SortingCriterion, Restaurant } from '../types/types';

class RestaurantService {
  private currentCategory: Category = CATEGORY.ALL;
  private currentSortingCriterion: SortingCriterion = SORTING_CRITERION.NAME;

  getRestaurantNames = () => {
    const restaurantList = this.getRestaurantList();
    return restaurantList.map((restaurant) => restaurant.name);
  };

  getRestaurantList() {
    const restaurantList = Object.keys(localStorage).map((key) => {
      const restaurantItem = localStorage.getItem(key);
      if (restaurantItem) return JSON.parse(restaurantItem);
    });

    if (restaurantList.length > 0) return restaurantList;
    return [];
  }

  getFavoriteRestaurantList() {
    const currentRestaurantList = this.getRestaurantList();

    return currentRestaurantList.filter(
      (restaurant) => restaurant.favoriteImageUrl === FAVORITE_ICON_IMAGE.FILLED,
    );
  }

  add(restaurant: Restaurant) {
    restaurant.favoriteImageUrl = FAVORITE_ICON_IMAGE.LINED; // 즐겨찾기 아이콘 기본 경로 설정
    localStorage.setItem(restaurant.name, JSON.stringify(restaurant));
  }

  remove(restaurantName: string) {
    localStorage.removeItem(restaurantName);
  }

  setCurrentCategory(category: Category) {
    this.currentCategory = category;
  }

  setCurrentSortingCriterion(criterion: SortingCriterion) {
    this.currentSortingCriterion = criterion;
  }

  filterBy(category: Category, restaurantList: Restaurant[]): Restaurant[] {
    if (category === CATEGORY.ALL) return [...restaurantList];

    return restaurantList.filter((restaurant) => restaurant.category === category);
  }

  sortBy(criterion: SortingCriterion, restaurantList: Restaurant[]): Restaurant[] {
    if (criterion === SORTING_CRITERION.NAME) {
      return [...restaurantList].sort((a, b) => a.name.localeCompare(b.name));
    }

    return [...restaurantList].sort((a, b) => a.distance - b.distance);
  }

  filterAndSort(restaurantList: Restaurant[] = this.getRestaurantList()): Restaurant[] {
    const filteredRestaurantList = this.filterBy(this.currentCategory, restaurantList);
    return this.sortBy(this.currentSortingCriterion, filteredRestaurantList);
  }
}

export default RestaurantService;
