import { CATEGORY, SORT } from "../constants";
import "../types/restaurant";

export default class RestaurantListManager {
  #restaurantList: RestaurantInfo[];

  constructor(restaurants: RestaurantInfo[]) {
    this.#restaurantList = restaurants;
  }

  addRestaurant(info: RestaurantInfo) {
    this.#restaurantList.push(info);
  }

  getRestaurantList(category: Category = "전체", sortingWay: SortingWay = "이름순") {
    const categorizedList = this.#categorizeRestaurants(category, this.#restaurantList);
    const sortedList = this.#sortRestaurants(sortingWay, categorizedList);

    return sortedList;
  }

  #categorizeRestaurants(category: Category, restaurants: RestaurantInfo[]) {
    if (category === CATEGORY.ALL) return restaurants;
    return restaurants.filter((restaurant) => restaurant.category === category);
  }

  #sortRestaurants(sortingWay: SortingWay, restaurants: RestaurantInfo[]) {
    if (sortingWay === SORT.NAME) {
      return [...restaurants].sort((a, b) => (a.name > b.name ? 1 : -1));
    }
    if (sortingWay === SORT.DISTANCE) {
      return [...restaurants].sort((a, b) => a.distance - b.distance);
    }

    return restaurants;
  }
}
