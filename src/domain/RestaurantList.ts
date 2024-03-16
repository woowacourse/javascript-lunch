import type { IRestaurantList, TRestaurantInstance, TCategory, TSorting } from '../types/restaurant';
import { STORAGE_KEY } from '../constants/config';
import { ALL, BY_NAME_ASC } from '../constants/filter';
import LocalStorage from './LocalStorage';

class RestaurantList {
  restaurants: IRestaurantList;

  constructor(restaurants: IRestaurantList) {
    const restaurantsInStorage = localStorage.getItem(STORAGE_KEY);
    if (restaurantsInStorage != null) this.restaurants = LocalStorage.getStorageRestaurantList(restaurantsInStorage);
    else this.restaurants = restaurants;
    LocalStorage.setStorageRestaurantList(this.restaurants);
  }

  setRestaurants(): void {
    const restaurantsInStorage = localStorage.getItem(STORAGE_KEY);
    if (restaurantsInStorage != null) this.restaurants = LocalStorage.getStorageRestaurantList(restaurantsInStorage);
  }

  getSortedByName(): IRestaurantList {
    return this.restaurants.sort((a, b) => (a.information.name > b.information.name ? 1 : -1));
  }

  getSortedByDistance(): IRestaurantList {
    return this.restaurants.sort((a, b) => (a.information.distance > b.information.distance ? 1 : -1));
  }

  getSortedByCondition(sortingCondition: TSorting): IRestaurantList {
    if (sortingCondition === BY_NAME_ASC) {
      return this.getSortedByName();
    }
    return this.getSortedByDistance();
  }

  filterByCategory(category: TCategory): void {
    this.setRestaurants();
    if (category !== ALL)
      this.restaurants = this.restaurants.filter(restaurant => restaurant.isMatchedCategory(category));
  }

  filterByFavorite(): void {
    this.setRestaurants();
    this.restaurants = this.restaurants.filter(restaurant => restaurant.isMatchedFavorite());
  }

  add(restaurant: TRestaurantInstance): void {
    this.setRestaurants();
    this.restaurants.push(restaurant);
    LocalStorage.setStorageRestaurantList(this.restaurants);
  }

  remove(restaurant: TRestaurantInstance): void {
    this.setRestaurants();
    const restaurantIndex = this.restaurants.indexOf(restaurant);
    this.restaurants.splice(restaurantIndex, 1);
    LocalStorage.setStorageRestaurantList(this.restaurants);
  }
}

export default RestaurantList;
