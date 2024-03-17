import { MatzipInterface, Restaurant, SortType, CategoryType } from './types';
import { CategoryValidator, NameValidator, DistanceValidator } from './validator/index';
import Condition from './constants/Condition';

const { CATEGORY } = Condition;

class Matzip implements MatzipInterface {
  restaurants: Restaurant[] = [];
  myFavorites: string[] = [];

  constructor(restaurants: Restaurant[], myFavorites: string[]) {
    this.restaurants = restaurants;
    this.myFavorites = myFavorites;
  }

  getRestaurants() {
    return [...this.restaurants];
  }
  
  getMyFavorites() {
    return [...this.myFavorites];
  }

  add(restaurant: Restaurant) {
    this.addValidate(restaurant);
    this.restaurants.push(restaurant);
  }

  addFavorite(targetId: string) {
    this.myFavorites.push(targetId);
  }

  deleteFavorite(targetId: string) {
    const targetIndex = this.myFavorites.findIndex((id) => id === targetId);
    this.myFavorites.splice(targetIndex, 1);
  }

  isFavorite(targetId: string) {
    return this.myFavorites.includes(targetId);
  }

  filterAndSort(category: CategoryType, sortBy: SortType) {
    if (category === CATEGORY.whole) return this.sort(sortBy, this.restaurants);
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
    if (category === CATEGORY.whole) return [...this.restaurants];
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
    this.restaurants.splice(targetIndex, 1);
    this.deleteFavorite(id);
  };
}

export default Matzip;
