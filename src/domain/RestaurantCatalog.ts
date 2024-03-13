import { ERROR_PREFIX, RESTAURANT_ERROR_MESSAGES } from '../constants/errorMessage';
import Restaurant, { IRestaurantInfo, ICategory } from './Restaurant';

export const SORT_CONDITION: readonly ('이름순' | '거리순')[] = Object.freeze(['이름순', '거리순']);

const ALL_CATEGORY = '전체';
export type ICatalogCategory = ICategory | typeof ALL_CATEGORY;

class RestaurantCatalog {
  #restaurants: Restaurant[] = [];

  pushNewRestaurant(restaurantInfo: IRestaurantInfo) {
    this.#restaurants.forEach((restaurant: Restaurant) => {
      if (restaurant.getInfo().name === restaurantInfo.name) {
        throw new Error(`${ERROR_PREFIX} ${RESTAURANT_ERROR_MESSAGES.DUPLICATE_NAME}`);
      }
    });

    const newRestaurant = new Restaurant(restaurantInfo);
    this.#restaurants.push(newRestaurant);
  }

  static filterByCategory(restaurants: IRestaurantInfo[], category: ICatalogCategory) {
    if (category === ALL_CATEGORY) {
      return restaurants;
    }
    return restaurants.filter((restaurant) => restaurant.category === category);
  }

  static sortByName(restaurants: IRestaurantInfo[]) {
    return restaurants.sort((restaurantPrev, restaurantCurrent) => {
      if (restaurantPrev.name < restaurantCurrent.name) return -1;
      return 1;
    });
  }

  static sortByDistance(restaurants: IRestaurantInfo[]) {
    return restaurants.sort((restaurantPrev, restaurantCurrent) => {
      if (restaurantPrev.distanceFromCampus !== restaurantCurrent.distanceFromCampus) {
        return restaurantPrev.distanceFromCampus - restaurantCurrent.distanceFromCampus;
      }
      return restaurantPrev.name.localeCompare(restaurantCurrent.name);
    });
  }

  getRestaurants() {
    return [...this.#restaurants];
  }

  getTotalRestaurantInfo() {
    return this.#restaurants.map((res) => res.getInfo());
  }
}

export default RestaurantCatalog;
