import { IRestaurant, RestaurantCategory, RestaurantSortType } from '../types';

import deepCopy from '../utils/deepCopy';

type FilterCategory = RestaurantCategory | '전체';

export default class Restaurants {
  #restaurants: IRestaurant[];

  constructor(data: IRestaurant[] = []) {
    this.#restaurants = data;
  }

  addRestaurant(restaurant: IRestaurant) {
    this.#restaurants.push(restaurant);
  }

  getFilteredRestaurantsByCategory(category: FilterCategory) {
    const copiedRestaurants: IRestaurant[] = deepCopy(this.#restaurants);

    if (category === '전체') {
      return copiedRestaurants;
    }

    return copiedRestaurants.filter((restaurant) => {
      return restaurant.category === category;
    });
  }

  getSortedRestaurants(filterdRestaurants: IRestaurant[], sortOption: RestaurantSortType) {
    if (sortOption === 'name') {
      return this.getSortedRestaurantsByName(filterdRestaurants);
    }

    return this.getSortedRestaurantsByDistance(filterdRestaurants);
  }

  getSortedRestaurantsByName(restaurants: IRestaurant[]) {
    const sortedRestaurants = restaurants.sort((restaurant1, restaurant2) => {
      return restaurant1.name.localeCompare(restaurant2.name);
    });

    return sortedRestaurants;
  }

  getSortedRestaurantsByDistance(restaurants: IRestaurant[]) {
    const sortedRestaurants = restaurants.sort((restaurant1, restaurant2) => {
      return Number(restaurant1.distance) - Number(restaurant2.distance);
    });

    return sortedRestaurants;
  }

  getRestaurants() {
    return deepCopy(this.#restaurants);
  }
}
