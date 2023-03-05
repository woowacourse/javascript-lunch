import { AllCategory, Category, SortingCriterion, Restaurant } from '../types/types';

class RestaurantService {
  private restaurantList: Restaurant[];
  private currentCategory: AllCategory | Category = '전체';
  private currentSortingCriterion: SortingCriterion = 'name';

  constructor() {
    this.restaurantList = JSON.parse(localStorage.getItem('restaurants') ?? '[]');
  }

  add(restaurant: Restaurant) {
    this.restaurantList.push(restaurant);
    localStorage.setItem('restaurants', JSON.stringify(this.restaurantList));
  }

  setCurrentCategory(category: AllCategory | Category) {
    this.currentCategory = category;
  }

  setCurrentSortingCriterion(criterion: SortingCriterion) {
    this.currentSortingCriterion = criterion;
  }

  filter() {
    if (this.currentCategory === '전체') return [...this.restaurantList];

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

    if (this.currentSortingCriterion === 'name') {
      return this.sortByName(filteredRestaurantList);
    }

    return this.sortByDistance(filteredRestaurantList);
  }
}

export default RestaurantService;
