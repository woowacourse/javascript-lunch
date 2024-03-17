import { ERROR_PREFIX, RESTAURANT_ERROR_MESSAGES } from '../constants/errorMessage';
import Restaurant, { IRestaurantInfo, Category } from './Restaurant';

export const SORT_CONDITION = Object.freeze(['이름순', '거리순'] as const);

export const ALL_CATEGORY = '전체';

export class RestaurantCatalog {
  restaurants: Map<number, Restaurant> = new Map();

  pushNewRestaurant(restaurantInfo: IRestaurantInfo) {
    if (!restaurantInfo) return;
    this.#validDuplicateName(restaurantInfo);
    if (restaurantInfo.id) {
      this.restaurants.set(restaurantInfo.id, new Restaurant(restaurantInfo));
      return;
    }
    const newRestaurant = this.#generateNewRestaurantInfo(restaurantInfo);
    this.restaurants.set(newRestaurant.id, new Restaurant(newRestaurant));
    return newRestaurant;
  }

  #generateNewRestaurantInfo(restaurantInfo: IRestaurantInfo) {
    const lastId = Array.from(this.restaurants.keys()).pop() || 0;
    return {
      ...restaurantInfo,
      id: restaurantInfo.id ?? lastId + 1,
      isLiked: restaurantInfo.isLiked ?? false,
    };
  }

  removeRestaurant(index: number) {
    this.restaurants.delete(index);
  }

  #validDuplicateName(restaurantInfo: IRestaurantInfo) {
    this.getRestaurantsClass().forEach((restaurant: Restaurant | null) => {
      if (restaurant && restaurant.getRestaurantInfoObject().name === restaurantInfo.name) {
        throw new Error(`${ERROR_PREFIX} ${RESTAURANT_ERROR_MESSAGES.DUPLICATE_NAME}`);
      }
    });
  }

  filterByCategory(category: Category | typeof ALL_CATEGORY): Restaurant[] | [] {
    if (category === ALL_CATEGORY) {
      return this.getRestaurantsClass().filter((restaurant) => restaurant) as Restaurant[];
    }
    return this.getRestaurantsClass().filter(
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

  getSpecificRestaurantInfo(id: number) {
    return this.restaurants.get(id)?.getRestaurantInfoObject();
  }

  getRestaurantsClass() {
    return Array.from(this.restaurants.values());
  }
}

const restaurantCatalog = new RestaurantCatalog();
export default restaurantCatalog;
