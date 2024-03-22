import type { IRestaurantList, TRestaurantInstance, TCategory, TSorting } from '../types/restaurant';
import { ALL, BY_NAME_ASC } from '../constants/filter';
import RestaurantsStorage from './RestaurantsStorage';
import { VOID } from '../constants/config';

class RestaurantList {
  restaurants: IRestaurantList;

  constructor(restaurants: IRestaurantList) {
    const storage = RestaurantsStorage.getRestaurants();

    if (storage === VOID) {
      this.restaurants = restaurants;
    } else this.restaurants = storage;

    RestaurantsStorage.setRestaurants(this.restaurants);
  }

  setRestaurants(): void {
    this.restaurants = RestaurantsStorage.getRestaurants();
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
    RestaurantsStorage.setRestaurants(this.restaurants);
  }

  remove(restaurant: TRestaurantInstance): void {
    this.setRestaurants();

    this.restaurants.forEach((thisRestaurant, index) => {
      if (thisRestaurant.information.name === restaurant.information.name) {
        this.restaurants.splice(index, 1);
        RestaurantsStorage.setRestaurants(this.restaurants);
      }
    });
  }
}

export default RestaurantList;
