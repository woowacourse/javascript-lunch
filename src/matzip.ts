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

  delete(restaurant: Restaurant) {
    const newRestaurants = this.restaurants.filter((item) => {
      return item.name !== restaurant.name;
    });

    this.restaurants = newRestaurants;
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
}

export default Matzip;
