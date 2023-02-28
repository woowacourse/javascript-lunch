import "../types/restaurant";
import Restaurant from "./Restaurant";

export default class RestaurantList {
  #restaurantList: Restaurant[];

  constructor() {
    this.#restaurantList = [];
  }

  getRestaurantList(): Restaurant[] {
    return [...this.#restaurantList];
  }

  addRestaurant(info: RestaurantInfo): void {
    this.#restaurantList.push(new Restaurant(info));
  }

  sortListByName(): void {
    this.#restaurantList.sort((a, b) =>
      a.getInfo().name > b.getInfo().name ? 1 : -1
    );
  }

  sortListByDistance(): void {
    this.#restaurantList.sort(
      (a, b) => a.getInfo().distance - b.getInfo().distance
    );
  }

  getFilteredListByCategory(category: Category) {
    return this.#restaurantList.filter(
      (restaurant) => restaurant.getInfo().category === category
    );
  }
}
