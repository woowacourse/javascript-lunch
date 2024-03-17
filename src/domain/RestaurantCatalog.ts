import { ERROR_PREFIX, RESTAURANT_ERROR_MESSAGES } from '../constants/errorMessage';
import Restaurant, { IRestaurantInfo, Category } from './Restaurant';

export const SORT_CONDITION = Object.freeze(['이름순', '거리순'] as const);

export const ALL_CATEGORY = '전체';

class RestaurantCatalog {
  restaurants: Array<Restaurant | null> = [];

  pushNewRestaurant(restaurantInfo: IRestaurantInfo) {
    if (!restaurantInfo) return;
    if (restaurantInfo.id) {
      this.restaurants[restaurantInfo.id] = new Restaurant(restaurantInfo);
      return;
    }
    this.#validDuplicateName(restaurantInfo);
    const newRestaurant = this.#generateNewRestaurantInfo(restaurantInfo);
    this.restaurants.push(new Restaurant(newRestaurant));
    return newRestaurant;
  }

  #generateNewRestaurantInfo(restaurantInfo: IRestaurantInfo) {
    return {
      ...restaurantInfo,
      id: restaurantInfo.id ?? this.restaurants.length,
      isLiked: restaurantInfo.isLiked ?? false,
    };
  }

  removeRestaurant(index: number) {
    this.restaurants[index] = null;
  }

  #validDuplicateName(restaurantInfo: IRestaurantInfo) {
    this.restaurants.forEach((restaurant: Restaurant | null) => {
      if (restaurant && restaurant.getRestaurantInfoObject().name === restaurantInfo.name) {
        throw new Error(`${ERROR_PREFIX} ${RESTAURANT_ERROR_MESSAGES.DUPLICATE_NAME}`);
      }
    });
  }

  filterByCategory(category: Category | typeof ALL_CATEGORY): Restaurant[] | [] {
    if (category === ALL_CATEGORY) {
      return this.restaurants.filter((restaurant) => restaurant) as Restaurant[];
    }
    return this.restaurants.filter(
      (restaurant) => restaurant && restaurant?.getRestaurantInfoObject().category === category,
    ) as Restaurant[];
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

  filterByLike(restaurants: IRestaurantInfo[], attribute: string) {
    if (attribute === 'like-restaurants') {
      return restaurants.filter((restaurant) => restaurant.isLiked);
    }
    return restaurants;
  }

  getSpecificRestaurantInfo(index: number) {
    return this.restaurants[index]?.getRestaurantInfoObject();
  }

  getRestaurantsClass() {
    return [...this.restaurants];
  }
}

const restaurantCatalog = new RestaurantCatalog();
export default restaurantCatalog;
