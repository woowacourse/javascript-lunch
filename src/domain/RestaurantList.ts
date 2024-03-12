import type { IRestaurantList, TRestaurantInstance, TCategory, TSorting } from '../types/restaurant';
import { STORAGE_KEY } from '../constants/config';
import { ALL, BY_NAME_ASC } from '../constants/filter';
import Restaurant from './Restaurant';

class RestaurantList {
  restaurants: IRestaurantList;

  constructor(restaurants: IRestaurantList) {
    if (!this.setRestaurants()) this.restaurants = restaurants;
    this.restaurants = this.getSortedByName();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.restaurants));
  }

  setRestaurants(): boolean {
    const restaurantsInStorage = localStorage.getItem(STORAGE_KEY);
    if (restaurantsInStorage != null) {
      this.restaurants = this.getStorageRestaurantList(restaurantsInStorage);
      return true;
    }
    return false;
  }

  // eslint-disable-next-line class-methods-use-this
  getStorageRestaurantList(restaurantsInStorage: string): IRestaurantList {
    const parsedRestaurantList: IRestaurantList = JSON.parse(restaurantsInStorage);
    return parsedRestaurantList.map(parsedRestaurant => new Restaurant(parsedRestaurant.information));
  }

  getSortedByName(): IRestaurantList {
    return [...this.restaurants].sort((a, b) => (a.information.name > b.information.name ? 1 : -1));
  }

  getSortedByDistance(): IRestaurantList {
    return [...this.restaurants].sort((a, b) => (a.information.distance > b.information.distance ? 1 : -1));
  }

  getSortedByCondition(sortingCondition: TSorting): IRestaurantList {
    if (sortingCondition === BY_NAME_ASC) {
      return this.getSortedByName();
    }
    return this.getSortedByDistance();
  }

  add(restaurant: TRestaurantInstance): void {
    this.setRestaurants();
    this.restaurants.push(restaurant);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.restaurants));
  }

  remove(restaurant: TRestaurantInstance): void {
    this.setRestaurants();
    const restaurantIndex = this.restaurants.indexOf(restaurant);
    this.restaurants.splice(restaurantIndex, 1);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.restaurants));
  }

  filterByCategory(category: TCategory): void {
    this.setRestaurants();
    if (category !== ALL)
      this.restaurants = this.restaurants.filter(restaurant => restaurant.isMatchedCategory(category));
  }
}

export default RestaurantList;
