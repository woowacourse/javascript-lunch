import { MatzipInterface, Restaurant, SortType, CategoryType } from './types';
import { CategoryValidator, NameValidator, DistanceValidator } from './validator/index';

class Matzip implements MatzipInterface {
  restaurants: Restaurant[] = [];

  constructor(restaurants: Restaurant[]) {
    this.restaurants = restaurants;
  }

  getRestaurants() {
    return [...this.restaurants];
  }

  add(restaurant: Restaurant) {
    this.addValidate(restaurant);
    this.restaurants.push(restaurant);
  }

  filterAndSort(category: CategoryType, sortBy: SortType) {
    if (category === '전체') return this.sort(sortBy, this.restaurants);
    const filterResult = [...this.restaurants].filter(
      (restaurant) => restaurant.category === category,
    );
    return this.sort(sortBy, filterResult);
  }

  sort(sortBy: SortType, restaurants: Restaurant[]) {
    const SORT_BY = {
      name: this.sortByName,
      distance: this.sortByDistance,
    };

    return [...restaurants].sort(SORT_BY[sortBy]);
  }

  filterByCategory(category: CategoryType) {
    if (category === '전체') return [...this.restaurants];
    return [...this.restaurants].filter((restaurant) => restaurant.category === category);
  }

  sortByName(a: Restaurant, b: Restaurant) {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  }

  sortByDistance(a: Restaurant, b: Restaurant) {
    if (a.distance < b.distance) {
      return -1;
    }
    if (a.distance > b.distance) {
      return 1;
    }
    return 0;
  }

  addValidate(restaurant: Restaurant) {
    CategoryValidator.empty(restaurant.category + '');
    CategoryValidator.exist(restaurant.category + '');
    NameValidator.empty(restaurant.name);
    DistanceValidator.empty(restaurant.distance);
    DistanceValidator.exist(restaurant.distance);
  }

  delete(id: string) {
    const targetIndex = this.restaurants.findIndex((restaurant) => restaurant.id === id);
    const front = this.restaurants.slice(0, targetIndex);
    const back = this.restaurants.slice(targetIndex + 1, this.restaurants.length);
    this.restaurants = [...front, ...back];
  };
}

export default Matzip;
