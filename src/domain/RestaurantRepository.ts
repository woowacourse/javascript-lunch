import "../types/restaurant";

export default class RestaurantRepository {
  #restaurantList: RestaurantInfo[];

  constructor(restaurants: RestaurantInfo[]) {
    this.#restaurantList = restaurants;
  }

  addRestaurant(info: RestaurantInfo): void {
    this.#restaurantList.push(info);
  }

  getRestaurantList(): RestaurantInfo[] {
    return [...this.#restaurantList];
  }

  static categorizeRestaurants(
    category: Category,
    restaurants: RestaurantInfo[]
  ): RestaurantInfo[] {
    return [...restaurants].filter(
      (restaurant) => restaurant.category === category
    );
  }

  static sortRestaurants(
    sortingWay: SortingWay,
    restaurants: RestaurantInfo[]
  ): RestaurantInfo[] {
    if (sortingWay === "distance")
      return [...restaurants].sort((a, b) => a.distance - b.distance);

    return [...restaurants].sort((a, b) => (a.name > b.name ? 1 : -1));
  }
}
