import type { IRestaurantList, TRestaurantInstance, TCategory, TSorting } from '../types/restaurant';
import { STORAGE_KEY } from '../constants/config';
import { ALL, BY_NAME_ASC } from '../constants/filter';
import RestaurantStorage from './RestaurantStorage';
import Restaurant from './Restaurant';

class RestaurantList {
  restaurants: IRestaurantList;

  constructor(restaurants: IRestaurantList) {
    const restaurantsInStorage = RestaurantStorage.get(STORAGE_KEY);
    this.restaurants = restaurantsInStorage.length > 0 ? restaurantsInStorage : restaurants;
    this.restaurants = this.getSortedByName();
    RestaurantStorage.set(this.restaurants);
  }

  getSortedByName(): IRestaurantList {
    return [...this.restaurants].sort((a, b) => (a.information.name > b.information.name ? 1 : -1));
  }

  getSortedByDistance(): IRestaurantList {
    return [...this.restaurants].sort((a, b) => (a.information.distance > b.information.distance ? 1 : -1));
  }

  getSortedByCondition(sortingCondition: TSorting): IRestaurantList {
    return sortingCondition === BY_NAME_ASC ? this.getSortedByName() : this.getSortedByDistance();
  }

  getRestaurantListLength() {
    return this.restaurants.length;
  }

  getFavoriteList() {
    return [...this.restaurants].filter(restaurant => restaurant.information.isFavorite);
  }

  getAllList() {
    return [...this.restaurants];
  }

  add(restaurant: TRestaurantInstance): void {
    const restaurantsInStorage = RestaurantStorage.get(STORAGE_KEY);
    this.restaurants = restaurantsInStorage.length > 0 ? [...restaurantsInStorage, restaurant] : [restaurant];
    RestaurantStorage.set(this.restaurants);
  }

  filterByCategory(category: TCategory): void {
    this.restaurants = RestaurantStorage.get(STORAGE_KEY);
    if (category !== ALL)
      this.restaurants = this.restaurants.filter(restaurant => restaurant.isMatchedCategory(category));
  }

  setFavoriteRestaurantList(targetId: string) {
    this.restaurants = this.restaurants.map(restaurant =>
      restaurant.information.id === targetId
        ? new Restaurant({ ...restaurant.information, isFavorite: !restaurant.information.isFavorite })
        : restaurant,
    );
    RestaurantStorage.set(this.restaurants);
  }
}

export default RestaurantList;
