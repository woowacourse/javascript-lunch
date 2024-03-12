import { ERROR_PREFIX, RESTAURANT_ERROR_MESSAGES } from '../constants/errorMessage';
import Restaurant, { IRestaurantInfo, Category } from './Restaurant';

export const SORT_CONDITION = Object.freeze(['이름순', '거리순'] as const);

export const ALL_CATEGORY = '전체';

class RestaurantCatalog {
  restaurants: Restaurant[] = [];

  pushNewRestaurant(restaurantInfo: IRestaurantInfo) {
    this.#validDuplicateName(restaurantInfo);
    const newRestaurant = { ...restaurantInfo, id: this.restaurants.length };
    this.restaurants.push(new Restaurant(newRestaurant));
    return newRestaurant;
  }

  #validDuplicateName(restaurantInfo: IRestaurantInfo) {
    this.restaurants.forEach((restaurant: Restaurant) => {
      if (restaurant.getRestaurantInfoObject().name === restaurantInfo.name) {
        throw new Error(`${ERROR_PREFIX} ${RESTAURANT_ERROR_MESSAGES.DUPLICATE_NAME}`);
      }
    });
  }

  filterByCategory(category: Category | typeof ALL_CATEGORY) {
    if (category === ALL_CATEGORY) {
      return this.restaurants;
    }
    return this.restaurants.filter((restaurant) => restaurant.getRestaurantInfoObject().category === category);
  }

  sortByName(restaurants: IRestaurantInfo[]) {
    return restaurants.sort((restaurantPrev, restaurantCurrent) => {
      if (restaurantPrev.name < restaurantCurrent.name) return -1;
      return 1;
    });
  }

  sortByDistance(restaurants: IRestaurantInfo[]) {
    return restaurants.sort((restaurantPrev, restaurantCurrent) => {
      if (restaurantPrev.distanceFromCampus !== restaurantCurrent.distanceFromCampus) {
        return restaurantPrev.distanceFromCampus - restaurantCurrent.distanceFromCampus;
      }
      return restaurantPrev.name.localeCompare(restaurantCurrent.name);
    });
  }

  getSpecificRestaurantInfo(index: number) {
    return this.restaurants[index].getRestaurantInfoObject();
  }

  getRestaurantsClass() {
    return [...this.restaurants];
  }
}

const restaurantCatalog = new RestaurantCatalog();
export default restaurantCatalog;
